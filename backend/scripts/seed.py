import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.append(str(ROOT / "ml"))
sys.path.append(str(ROOT / "backend"))

from sqlalchemy import text

from app.database import SessionLocal
from src.career_mapping import CAREER_FAMILY


def seed():
     with SessionLocal() as session:
          families = sorted(set(CAREER_FAMILY.values()))

          for family in families:
               session.execute(
                    text("INSERT IGNORE INTO career_families (name) VALUES (:name)"),
                    {"name": family},
               )
          session.commit()

          for career, family in CAREER_FAMILY.items():
               session.execute(
                    text(
                         "INSERT IGNORE INTO careers (name, family_id) "
                         "SELECT :career, id FROM career_families WHERE name = :family"
                    ),
                    {"career": career, "family": family},
               )
          session.commit()

     print(f"Seeded {len(families)} families and {len(CAREER_FAMILY)} careers.")


if __name__ == "__main__":
     seed()