"""
Code Execution Routes
Handles running Python code, model evaluation, and visualization
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import sys
from io import StringIO
import traceback
import numpy as np
import json

router = APIRouter()

class CodeExecutionRequest(BaseModel):
    code: str
    timeout: Optional[int] = 30  # seconds

class EvaluationRequest(BaseModel):
    y_true: List[float]
    y_pred: List[float]
    task_type: str  # 'regression' or 'classification'

@router.post("/run")
async def execute_code(request: CodeExecutionRequest):
    """
    Execute Python code in a sandboxed environment
    
    Args:
        request: Code execution request with code string
    
    Returns:
        Execution result with output, errors, and variables
    """
    # Capture stdout and stderr
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    redirected_output = StringIO()
    redirected_error = StringIO()
    
    sys.stdout = redirected_output
    sys.stderr = redirected_error
    
    result = {
        "success": False,
        "output": "",
        "error": "",
        "variables": {}
    }
    
    try:
        # Create restricted namespace
        namespace = {
            '__builtins__': __builtins__,
            'np': np,
            'numpy': np,
        }
        
        # Execute code
        exec(request.code, namespace)
        
        # Capture output
        result["output"] = redirected_output.getvalue()
        result["success"] = True
        
        # Extract interesting variables (avoid builtins)
        result["variables"] = {
            k: str(v) for k, v in namespace.items()
            if not k.startswith('__') and k not in ['np', 'numpy']
        }
        
    except Exception as e:
        result["error"] = f"{type(e).__name__}: {str(e)}\n{traceback.format_exc()}"
        result["output"] = redirected_output.getvalue()
    
    finally:
        # Restore stdout and stderr
        sys.stdout = old_stdout
        sys.stderr = old_stderr
    
    return result

@router.post("/evaluate")
async def evaluate_model(request: EvaluationRequest):
    """
    Evaluate model performance with appropriate metrics
    
    Args:
        request: Evaluation request with true and predicted values
    
    Returns:
        Dictionary of evaluation metrics
    """
    y_true = np.array(request.y_true)
    y_pred = np.array(request.y_pred)
    
    if request.task_type == "regression":
        # Regression metrics
        from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
        
        mse = mean_squared_error(y_true, y_pred)
        rmse = np.sqrt(mse)
        mae = mean_absolute_error(y_true, y_pred)
        r2 = r2_score(y_true, y_pred)
        
        return {
            "task_type": "regression",
            "metrics": {
                "MSE": float(mse),
                "RMSE": float(rmse),
                "MAE": float(mae),
                "R²": float(r2)
            },
            "interpretation": {
                "MSE": f"Average squared error: {mse:.2f}",
                "RMSE": f"Average error: {rmse:.2f} (in original units)",
                "R²": f"Model explains {r2*100:.1f}% of variance"
            }
        }
    
    elif request.task_type == "classification":
        # Classification metrics
        from sklearn.metrics import (
            accuracy_score, precision_score, recall_score,
            f1_score, confusion_matrix
        )
        
        # Convert to integers for classification
        y_true = y_true.astype(int)
        y_pred = y_pred.astype(int)
        
        accuracy = accuracy_score(y_true, y_pred)
        
        # Handle binary vs multiclass
        average = 'binary' if len(np.unique(y_true)) == 2 else 'weighted'
        
        precision = precision_score(y_true, y_pred, average=average, zero_division=0)
        recall = recall_score(y_true, y_pred, average=average, zero_division=0)
        f1 = f1_score(y_true, y_pred, average=average, zero_division=0)
        cm = confusion_matrix(y_true, y_pred)
        
        return {
            "task_type": "classification",
            "metrics": {
                "Accuracy": float(accuracy),
                "Precision": float(precision),
                "Recall": float(recall),
                "F1-Score": float(f1),
                "Confusion Matrix": cm.tolist()
            },
            "interpretation": {
                "Accuracy": f"{accuracy*100:.1f}% of predictions are correct",
                "Precision": f"{precision*100:.1f}% of positive predictions are actually positive",
                "Recall": f"{recall*100:.1f}% of actual positives were caught",
                "F1-Score": f"Balanced score: {f1:.2f}"
            }
        }
    
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid task_type: {request.task_type}. Must be 'regression' or 'classification'"
        )

@router.post("/visualize")
async def generate_visualization(data: Dict[str, Any]):
    """
    Generate visualization data for plotting
    
    Args:
        data: Dictionary with visualization parameters
    
    Returns:
        Plotly-compatible visualization data
    """
    viz_type = data.get("type", "scatter")
    
    if viz_type == "scatter":
        return {
            "type": "scatter",
            "data": {
                "x": data.get("x", []),
                "y": data.get("y", []),
                "mode": "markers",
                "marker": {"size": 8}
            },
            "layout": {
                "title": data.get("title", "Scatter Plot"),
                "xaxis": {"title": data.get("xlabel", "X")},
                "yaxis": {"title": data.get("ylabel", "Y")}
            }
        }
    
    elif viz_type == "line":
        return {
            "type": "scatter",
            "data": {
                "x": data.get("x", []),
                "y": data.get("y", []),
                "mode": "lines",
                "line": {"width": 2}
            },
            "layout": {
                "title": data.get("title", "Line Plot"),
                "xaxis": {"title": data.get("xlabel", "X")},
                "yaxis": {"title": data.get("ylabel", "Y")}
            }
        }
    
    elif viz_type == "confusion_matrix":
        cm = np.array(data.get("matrix", [[0]]))
        return {
            "type": "heatmap",
            "data": {
                "z": cm.tolist(),
                "colorscale": "Blues",
                "showscale": True
            },
            "layout": {
                "title": "Confusion Matrix",
                "xaxis": {"title": "Predicted"},
                "yaxis": {"title": "Actual"}
            }
        }
    
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported visualization type: {viz_type}"
        )
