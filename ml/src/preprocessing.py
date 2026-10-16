from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, StandardScaler

from src import config


def build_preprocessor() -> ColumnTransformer:
     return ColumnTransformer(
          transformers=[
               ("numeric", StandardScaler(), config.NUMERIC_FEATURES),
               (
                    "ordinal",
                    OrdinalEncoder(categories=[config.ORDINAL_LEVELS] * len(config.ORDINAL_FEATURES)),
                    config.ORDINAL_FEATURES,
               ),
               (
                    "categorical",
                    OneHotEncoder(
                         handle_unknown="infrequent_if_exist",
                         min_frequency=config.RARE_DOMAIN_MIN_COUNT,
                         sparse_output=False,
                    ),
                    config.CATEGORICAL_FEATURES,
               ),
          ]
     )