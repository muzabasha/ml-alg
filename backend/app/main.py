"""
FastAPI Backend for ML Algorithms Learning Platform
Handles algorithm execution, visualization, and evaluation
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

# Initialize FastAPI app
app = FastAPI(
    title="ML Algorithms Learning Platform API",
    description="Backend API for interactive ML algorithm learning",
    version="1.0.0"
)

# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Add production URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Check if the API is running."""
    return {"status": "healthy", "message": "ML Learning Platform API is running"}

# Import routes
from routes import algorithms, execution, learning_path

# Include routers
app.include_router(algorithms.router, prefix="/api/algorithms", tags=["algorithms"])
app.include_router(execution.router, prefix="/api/execute", tags=["execution"])
app.include_router(learning_path.router, prefix="/api/learning-path", tags=["learning-path"])

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
