from sklearn.model_selection import train_test_split

from src import config
from src.data_loader import load_dataset
from src.evaluate import cross_validate
from src.model import build_pipeline
from src.persistence import save_model


def main():
     df = load_dataset()
     X = df[config.FEATURES]
     y = df[config.TARGET]

     X_train, X_test, y_train, y_test = train_test_split(
          X, y,
          test_size=config.TEST_SIZE,
          random_state=config.RANDOM_STATE,
          stratify=y,
     )

     scores = cross_validate(build_pipeline(), X, y)
     print(f"Cross-validation accuracy: {scores.mean():.3f} (+/- {scores.std():.3f})")

     test_pipeline = build_pipeline()
     test_pipeline.fit(X_train, y_train)
     print(f"Test accuracy: {test_pipeline.score(X_test, y_test):.3f}")

     final_pipeline = build_pipeline()
     final_pipeline.fit(X, y)
     save_model(final_pipeline)
     print(f"Model saved to {config.MODEL_PATH}")


if __name__ == "__main__":
     main()