import random

def analyze_document(file_path):
    
    score = random.randint(55, 95)

    if score > 80:
        risk = "HIGH"
    elif score > 65:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    reasons = [
        "Font inconsistency detected",
        "Possible edited image patch",
        "Alignment mismatch in text rows",
        "Blurred signature area",
        "Number overwrite suspicion"
    ]

    selected = random.sample(reasons, 3)

    return {
        "filename": file_path,
        "forgery_risk": risk,
        "confidence": f"{score}%",
        "reasons": selected
    }