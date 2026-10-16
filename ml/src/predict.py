import pandas as pd

from src import config
from src.persistence import load_model


def predict_top_k(profile: dict, k: int = 3) -> list[dict]:
     model = load_model()
     X = pd.DataFrame([profile], columns=config.FEATURES)

     probabilities = model.predict_proba(X)[0]
     ranked = sorted(
          zip(model.classes_, probabilities),
          key=lambda pair: pair[1],
          reverse=True,
     )

     return [
          {"family": family, "probability": round(float(prob), 3)}
          for family, prob in ranked[:k]
     ]