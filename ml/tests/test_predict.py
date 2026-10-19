from src.predict import predict_top_k

PROFILE = {
     "GPA": 3.6,
     "Interested Domain": "Cybersecurity",
     "Python": "Average",
     "SQL": "Weak",
     "Java": "Strong",
}


def test_returns_three_families():
     results = predict_top_k(PROFILE)
     assert len(results) == 3


def test_results_are_sorted_by_probability():
     results = predict_top_k(PROFILE)
     probabilities = [item["probability"] for item in results]
     assert probabilities == sorted(probabilities, reverse=True)


def test_cybersecurity_profile_gives_security():
     results = predict_top_k(PROFILE)
     assert results[0]["family"] == "Security"


def test_unknown_domain_does_not_crash():
     profile = {**PROFILE, "Interested Domain": "Unknown Domain"}
     results = predict_top_k(profile)
     assert len(results) == 3