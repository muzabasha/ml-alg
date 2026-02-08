export const executeCode = async (code: string) => {
    try {
        const response = await fetch('http://localhost:8000/api/execute/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error executing code:', error);
        return { error: 'Failed to connect to backend' };
    }
};

export const evaluateModel = async (yTrue: number[], yPred: number[], taskType: 'regression' | 'classification') => {
    try {
        const response = await fetch('http://localhost:8000/api/execute/evaluate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ y_true: yTrue, y_pred: yPred, task_type: taskType }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error evaluating model:', error);
        return { error: 'Failed to connect to backend' };
    }
};
