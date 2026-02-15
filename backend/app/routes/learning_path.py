"""
Learning Path API Routes
Handles progress tracking, achievements, challenges, and certificates
Requirements: 13.2, 13.3, 8.2, 15.1, 7.1, 7.2
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
from datetime import datetime
import json
import os

router = APIRouter()

# In-memory storage (replace with database in production)
progress_store: Dict[str, Any] = {}
achievements_store: Dict[str, List[Any]] = {}
certificates_store: Dict[str, List[Any]] = {}
challenges_store: Dict[str, List[Any]] = {}

# Data directory for persistence
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
os.makedirs(DATA_DIR, exist_ok=True)

# Pydantic models
class ProgressData(BaseModel):
    studentId: str
    algorithmProgress: Dict[str, Any]
    completedSteps: Dict[str, List[str]]
    onboardingComplete: bool = False
    lastSyncDate: datetime = Field(default_factory=datetime.now)

class ProgressSyncRequest(BaseModel):
    studentId: str
    updates: Dict[str, Any]
    timestamp: datetime

class AchievementAwardRequest(BaseModel):
    studentId: str
    achievementId: str
    earnedDate: datetime = Field(default_factory=datetime.now)

class ChallengeSubmission(BaseModel):
    studentId: str
    challengeId: str
    algorithmId: str
    selectedAnswer: str
    timeSpent: int
    timestamp: datetime = Field(default_factory=datetime.now)

class CertificateGenerateRequest(BaseModel):
    studentId: str
    certificateType: str
    studentName: str
    completionDate: datetime = Field(default_factory=datetime.now)


# Helper functions
def load_progress_from_file(student_id: str) -> Optional[Dict]:
    """Load progress from file"""
    file_path = os.path.join(DATA_DIR, f'progress_{student_id}.json')
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading progress: {e}")
    return None

def save_progress_to_file(student_id: str, data: Dict):
    """Save progress to file"""
    file_path = os.path.join(DATA_DIR, f'progress_{student_id}.json')
    try:
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2, default=str)
    except Exception as e:
        print(f"Error saving progress: {e}")


# Progress endpoints
@router.post("/progress/save")
async def save_progress(progress: ProgressData):
    """
    Save student progress data
    Requirements: 13.2, 13.3
    """
    try:
        progress_data = progress.dict()
        progress_store[progress.studentId] = progress_data
        save_progress_to_file(progress.studentId, progress_data)
        
        return {
            "success": True,
            "message": "Progress saved successfully",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save progress: {str(e)}")


@router.get("/progress/load/{student_id}")
async def load_progress(student_id: str):
    """
    Load student progress data
    Requirements: 13.2, 13.3
    """
    try:
        # Try memory first
        if student_id in progress_store:
            return {
                "success": True,
                "data": progress_store[student_id]
            }
        
        # Try file storage
        file_data = load_progress_from_file(student_id)
        if file_data:
            progress_store[student_id] = file_data
            return {
                "success": True,
                "data": file_data
            }
        
        # Return empty progress
        return {
            "success": True,
            "data": {
                "studentId": student_id,
                "algorithmProgress": {},
                "completedSteps": {},
                "onboardingComplete": False,
                "lastSyncDate": datetime.now().isoformat()
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load progress: {str(e)}")


@router.post("/progress/sync")
async def sync_progress(sync_request: ProgressSyncRequest):
    """
    Sync progress updates with conflict resolution
    Requirements: 13.3, 13.5
    """
    try:
        student_id = sync_request.studentId
        
        # Get existing progress
        existing = progress_store.get(student_id) or load_progress_from_file(student_id)
        
        if not existing:
            # No existing data, save new
            progress_store[student_id] = {
                "studentId": student_id,
                "algorithmProgress": sync_request.updates,
                "lastSyncDate": sync_request.timestamp.isoformat()
            }
        else:
            # Merge updates (last write wins for conflicts)
            existing_timestamp = datetime.fromisoformat(existing.get("lastSyncDate", "2000-01-01T00:00:00"))
            
            if sync_request.timestamp > existing_timestamp:
                # Update is newer, merge it
                existing["algorithmProgress"].update(sync_request.updates)
                existing["lastSyncDate"] = sync_request.timestamp.isoformat()
                progress_store[student_id] = existing
            else:
                # Existing is newer, return conflict
                return {
                    "success": False,
                    "conflict": True,
                    "message": "Server has newer data",
                    "serverData": existing
                }
        
        save_progress_to_file(student_id, progress_store[student_id])
        
        return {
            "success": True,
            "message": "Progress synced successfully",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to sync progress: {str(e)}")


# Achievement endpoints
@router.get("/achievements/{student_id}")
async def get_achievements(student_id: str):
    """
    Get all achievements for a student
    Requirements: 8.2
    """
    try:
        achievements = achievements_store.get(student_id, [])
        return {
            "success": True,
            "achievements": achievements
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get achievements: {str(e)}")


@router.post("/achievements/award")
async def award_achievement(award: AchievementAwardRequest):
    """
    Award an achievement to a student
    Requirements: 8.2
    """
    try:
        if award.studentId not in achievements_store:
            achievements_store[award.studentId] = []
        
        # Check if already awarded
        existing = next((a for a in achievements_store[award.studentId] if a["achievementId"] == award.achievementId), None)
        if existing:
            return {
                "success": False,
                "message": "Achievement already awarded"
            }
        
        achievement_data = {
            "achievementId": award.achievementId,
            "earnedDate": award.earnedDate.isoformat()
        }
        
        achievements_store[award.studentId].append(achievement_data)
        
        return {
            "success": True,
            "message": "Achievement awarded successfully",
            "achievement": achievement_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to award achievement: {str(e)}")


# Certificate endpoints
@router.get("/certificates/{student_id}")
async def get_certificates(student_id: str):
    """
    Get earned certificates for a student
    Requirements: 15.1
    """
    try:
        certificates = certificates_store.get(student_id, [])
        return {
            "success": True,
            "certificates": certificates
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get certificates: {str(e)}")


@router.post("/certificates/generate")
async def generate_certificate(cert_request: CertificateGenerateRequest):
    """
    Generate a certificate for a student
    Requirements: 15.1
    """
    try:
        if cert_request.studentId not in certificates_store:
            certificates_store[cert_request.studentId] = []
        
        # Generate unique certificate ID
        cert_id = f"CERT-{cert_request.certificateType.upper()}-{cert_request.studentId}-{int(datetime.now().timestamp())}"
        
        certificate_data = {
            "certificateId": cert_id,
            "certificateType": cert_request.certificateType,
            "studentName": cert_request.studentName,
            "completionDate": cert_request.completionDate.isoformat(),
            "downloadUrl": f"/api/certificates/download/{cert_id}",
            "shareUrl": f"/certificates/{cert_id}"
        }
        
        certificates_store[cert_request.studentId].append(certificate_data)
        
        return {
            "success": True,
            "message": "Certificate generated successfully",
            "certificate": certificate_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate certificate: {str(e)}")


# Challenge endpoints
@router.get("/challenges/{algorithm_id}")
async def get_challenge(algorithm_id: str):
    """
    Get challenge for an algorithm
    Requirements: 7.1
    """
    try:
        # In production, load from database
        # For now, return a sample challenge structure
        return {
            "success": True,
            "challenge": {
                "id": f"challenge_{algorithm_id}",
                "algorithmId": algorithm_id,
                "question": "Sample challenge question",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": "Option A",
                "hint": "Think about the core concept",
                "explanation": "Detailed explanation here"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get challenge: {str(e)}")


@router.post("/challenges/submit")
async def submit_challenge(submission: ChallengeSubmission):
    """
    Submit a challenge response
    Requirements: 7.2
    """
    try:
        if submission.studentId not in challenges_store:
            challenges_store[submission.studentId] = []
        
        # Store submission
        submission_data = submission.dict()
        challenges_store[submission.studentId].append(submission_data)
        
        # In production, validate answer against database
        # For now, return success
        return {
            "success": True,
            "message": "Challenge submission recorded",
            "result": {
                "correct": True,  # Would validate in production
                "score": 100,
                "feedback": "Great job!",
                "explanation": "Your answer is correct"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit challenge: {str(e)}")


@router.get("/challenges/history/{student_id}/{algorithm_id}")
async def get_challenge_history(student_id: str, algorithm_id: str):
    """
    Get challenge attempt history for an algorithm
    Requirements: 7.2
    """
    try:
        all_submissions = challenges_store.get(student_id, [])
        algorithm_submissions = [s for s in all_submissions if s.get("algorithmId") == algorithm_id]
        
        return {
            "success": True,
            "history": algorithm_submissions
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get challenge history: {str(e)}")
