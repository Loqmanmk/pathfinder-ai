from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from app.dependencies import get_session
from app.schemas import StudentProfile
from app.services import recommend

app = FastAPI(title="PathFinder API")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/recommend")
def recommend_route(
     profile: StudentProfile,
     session: Session = Depends(get_session),
):
     return {"recommendations": recommend(session, profile)}