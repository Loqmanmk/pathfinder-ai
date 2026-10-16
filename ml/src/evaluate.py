from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import StratifiedKFold, cross_val_score


def cross_validate(pipeline, X, y, folds: int = 5, random_state: int = 42):
     cv = StratifiedKFold(n_splits=folds, shuffle=True, random_state=random_state)
     return cross_val_score(pipeline, X, y, cv=cv, scoring="accuracy")


def report(pipeline, X_test, y_test) -> str:
     y_pred = pipeline.predict(X_test)
     return classification_report(y_test, y_pred, zero_division=0)


def matrix(pipeline, X_test, y_test):
     y_pred = pipeline.predict(X_test)
     labels = pipeline.classes_
     return confusion_matrix(y_test, y_pred, labels=labels), labels