import json

from sqlalchemy import text
from sqlalchemy.orm import Session

from app.schemas import StudentProfile


def save_recommendation(session: Session, profile: StudentProfile, top_family: str) -> None:
     session.execute(
          text(
               "INSERT INTO recommendations (profile, top_family) "
               "VALUES (:profile, :top_family)"
          ),
          {"profile": json.dumps(profile.model_dump()), "top_family": top_family},
     )
     session.commit()