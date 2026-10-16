from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent  # the ml/ folder
RAW_DATA_PATH = BASE_DIR / "data" / "raw" / "cs_students.csv"
MODEL_PATH = BASE_DIR / "models" / "career_model.joblib"

RAW_TARGET = "Future Career"
TARGET = "Career Family"

NUMERIC_FEATURES = ["GPA"]
ORDINAL_FEATURES = ["Python", "SQL", "Java"]
ORDINAL_LEVELS = ["Weak", "Average", "Strong"]
CATEGORICAL_FEATURES = ["Interested Domain"]
FEATURES = NUMERIC_FEATURES + ORDINAL_FEATURES + CATEGORICAL_FEATURES

RANDOM_STATE = 42
TEST_SIZE = 0.2
RARE_DOMAIN_MIN_COUNT = 5