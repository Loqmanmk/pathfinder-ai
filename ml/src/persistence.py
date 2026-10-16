import joblib

from src import config


def save_model(pipeline):
     config.MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
     joblib.dump(pipeline, config.MODEL_PATH)


def load_model():
     return joblib.load(config.MODEL_PATH)