import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ML_DIR = ROOT / "ml"

if str(ML_DIR) not in sys.path:
     sys.path.append(str(ML_DIR))