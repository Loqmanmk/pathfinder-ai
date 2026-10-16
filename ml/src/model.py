from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

from src import config
from src.preprocessing import build_preprocessor


def default_classifier():
     return LogisticRegression(
          max_iter=1000,
          class_weight="balanced",
          random_state=config.RANDOM_STATE,
     )


def build_pipeline(classifier=None):
     if classifier is None:
          classifier = default_classifier()

     return Pipeline(
          steps=[
               ("preprocessor", build_preprocessor()),
               ("classifier", classifier),
          ]
     )