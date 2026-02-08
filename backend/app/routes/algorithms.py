"""
Algorithm Routes
Handles fetching algorithm content and metadata
"""

from fastapi import APIRouter, HTTPException
from pathlib import Path
import json
from typing import List, Dict, Any

router = APIRouter()

# Path to algorithm content
CONTENT_DIR = Path(__file__).parent.parent.parent.parent / "content" / "algorithms"

def load_algorithm(algorithm_id: str) -> Dict[str, Any]:
    """Load algorithm content from JSON file"""
    file_path = CONTENT_DIR / f"{algorithm_id}.json"
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"Algorithm '{algorithm_id}' not found")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

@router.get("/list")
async def list_algorithms():
    """
    Get list of all available algorithms with metadata
    Returns: List of algorithm summaries
    """
    algorithms = []
    
    # Scan content directory for algorithm files
    if not CONTENT_DIR.exists():
        return {"algorithms": [], "count": 0}
    
    for file_path in CONTENT_DIR.glob("*.json"):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                # Extract summary info
                algorithms.append({
                    "id": data.get("id"),
                    "name": data.get("name"),
                    "category": data.get("category"),
                    "difficulty": data.get("difficulty"),
                    "estimatedTime": data.get("estimatedTime")
                })
        except Exception as e:
            print(f"Error loading {file_path}: {e}")
            continue
    
    # Sort by category and difficulty
    algorithms.sort(key=lambda x: (x["category"], x["difficulty"]))
    
    return {
        "algorithms": algorithms,
        "count": len(algorithms)
    }

@router.get("/{algorithm_id}")
async def get_algorithm(algorithm_id: str):
    """
    Get complete algorithm content
    
    Args:
        algorithm_id: Unique identifier for the algorithm (e.g., 'linear_regression')
    
    Returns:
        Complete algorithm content with all sections
    """
    return load_algorithm(algorithm_id)

@router.get("/{algorithm_id}/section/{section_name}")
async def get_algorithm_section(algorithm_id: str, section_name: str):
    """
    Get specific section of an algorithm
    
    Args:
        algorithm_id: Unique identifier for the algorithm
        section_name: Name of the section (e.g., 'introduction', 'mathematical_model')
    
    Returns:
        Specific section content
    """
    algorithm = load_algorithm(algorithm_id)
    
    if "sections" not in algorithm or section_name not in algorithm["sections"]:
        raise HTTPException(
            status_code=404,
            detail=f"Section '{section_name}' not found in algorithm '{algorithm_id}'"
        )
    
    return {
        "algorithm_id": algorithm_id,
        "algorithm_name": algorithm["name"],
        "section_name": section_name,
        "content": algorithm["sections"][section_name]
    }

@router.get("/{algorithm_id}/compare")
async def compare_algorithms(algorithm_id: str, compare_with: str):
    """
    Compare two algorithms side by side
    
    Args:
        algorithm_id: First algorithm ID
        compare_with: Second algorithm ID to compare with
    
    Returns:
        Comparison data for both algorithms
    """
    algo1 = load_algorithm(algorithm_id)
    algo2 = load_algorithm(compare_with)
    
    return {
        "algorithm1": {
            "id": algo1["id"],
            "name": algo1["name"],
            "category": algo1["category"],
            "strengths": algo1["sections"]["introduction"]["strengths"],
            "limitations": algo1["sections"]["introduction"]["limitations"],
            "learningType": algo1["sections"]["introduction"]["learningType"]
        },
        "algorithm2": {
            "id": algo2["id"],
            "name": algo2["name"],
            "category": algo2["category"],
            "strengths": algo2["sections"]["introduction"]["strengths"],
            "limitations": algo2["sections"]["introduction"]["limitations"],
            "learningType": algo2["sections"]["introduction"]["learningType"]
        }
    }

@router.get("/categories/list")
async def list_categories():
    """
    Get list of all algorithm categories
    
    Returns:
        List of unique categories with algorithm counts
    """
    algorithms = []
    
    if not CONTENT_DIR.exists():
        return {"categories": []}
    
    for file_path in CONTENT_DIR.glob("*.json"):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                algorithms.append(data)
        except Exception:
            continue
    
    # Group by category
    categories = {}
    for algo in algorithms:
        cat = algo.get("category", "Uncategorized")
        if cat not in categories:
            categories[cat] = []
        categories[cat].append({
            "id": algo["id"],
            "name": algo["name"],
            "difficulty": algo.get("difficulty", "Unknown")
        })
    
    return {
        "categories": [
            {
                "name": cat,
                "algorithms": algos,
                "count": len(algos)
            }
            for cat, algos in categories.items()
        ]
    }
