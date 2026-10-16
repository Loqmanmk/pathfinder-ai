import pandas as pd

from src import config
from src.career_mapping import CAREER_FAMILY


def load_dataset() -> pd.DataFrame:
     df = pd.read_csv(config.RAW_DATA_PATH)
     df[config.TARGET] = df[config.RAW_TARGET].map(CAREER_FAMILY)

     if df[config.TARGET].isnull().any():
          raise ValueError("Some careers are missing from CAREER_FAMILY")

     return df