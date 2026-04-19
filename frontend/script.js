let latestReport = "";

async function scanFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file");
        return;
    }

    document.getElementById("loading").innerHTML = "Scanning document...";
    document.getElementById("result").style.display = "none";
    document.getElementById("downloadBtn").style.display = "none";

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:8000/scan", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    document.getElementById("loading").innerHTML = "";

    let riskClass = "low";
    if (data.forgery_risk === "MEDIUM") riskClass = "medium";
    if (data.forgery_risk === "HIGH") riskClass = "high";

    latestReport =
`VeriDoc AI Report

Risk Level: ${data.forgery_risk}
Confidence: ${data.confidence}

Reasons:
- ${data.reasons[0]}
- ${data.reasons[1]}
- ${data.reasons[2]}
`;

    document.getElementById("result").innerHTML = `
        <h3>Scan Result</h3>
        <p><b>Risk:</b> <span class="${riskClass}">${data.forgery_risk}</span></p>
        <p><b>Confidence:</b> ${data.confidence}</p>
        <p><b>Reasons:</b></p>
        <ul>
            <li>${data.reasons[0]}</li>
            <li>${data.reasons[1]}</li>
            <li>${data.reasons[2]}</li>
        </ul>
    `;

    document.getElementById("result").style.display = "block";
    document.getElementById("downloadBtn").style.display = "inline-block";
}

function downloadReport() {
    const blob = new Blob([latestReport], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "VeriDoc_Report.txt";
    a.click();
}