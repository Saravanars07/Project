
document.addEventListener('DOMContentLoaded', function() {
// Fade-in Animation on Scroll
function revealOnScroll() {
document.querySelectorAll('.fade-in').forEach(function(el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
    el.classList.add('visible');
    }
});
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Feature Importance Chart
const featChartEl = document.getElementById('featChart');
if (featChartEl) {
const ctx = featChartEl.getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
    labels: ['tau1','tau2','tau3','tau4','p1','p2','p3','p4','g1','g2','g3','g4'],
    datasets: [{
        label: 'Importance',
        data: [0.12,0.08,0.15,0.10,0.09,0.11,0.07,0.10,0.06,0.05,0.04,0.03],
        backgroundColor: '#ffd700'
    }]
    },
    options: {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 0.2 } }
    }
});
}

// Demo Form Submission
const predictForm = document.getElementById('predictForm');
if (predictForm) {
predictForm.onsubmit = async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {};
    for (const field of ['tau1','tau2','tau3','tau4','p1','p2','p3','p4','g1','g2','g3','g4']) {
    data[field] = form[field].value;
    }
    document.getElementById('loadingSpinner').classList.remove('d-none');
    document.getElementById('predictionResult').classList.add('d-none');
    // Replace with your deployed API endpoint
    const apiUrl = "/predict";
    try {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    document.getElementById('loadingSpinner').classList.add('d-none');
    const resultDiv = document.getElementById('predictionResult');
    resultDiv.classList.remove('d-none');
    resultDiv.classList.add('animated');
    resultDiv.innerHTML = `<strong>Prediction:</strong> ${result.prediction}`;
    setTimeout(()=>resultDiv.classList.remove('animated'), 600);
    } catch (err) {
    document.getElementById('loadingSpinner').classList.add('d-none');
    const resultDiv = document.getElementById('predictionResult');
    resultDiv.classList.remove('d-none');
    resultDiv.innerHTML = `<strong>Error:</strong> Unable to get prediction.`;
    }
};
}
});


