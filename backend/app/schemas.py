from typing import Literal

from pydantic import BaseModel, Field

Level = Literal["Weak", "Average", "Strong"]


class StudentProfile(BaseModel):
     gpa: float = Field(ge=0, le=4)
     interested_domain: str
     python: Level
     sql: Level
     java: Level