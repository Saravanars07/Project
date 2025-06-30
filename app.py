from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import re

app = Flask(__name__)

model = joblib.load('grid_stability_rf.pkl')

# Regex to match a valid float (with optional leading sign)
float_regex = re.compile(r'^[-+]?\d*(\.\d+)?$')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        features = []
        for f in ['tau1','tau2','tau3','tau4','p1','p2','p3','p4','g1','g2','g3','g4']:
            val = str(data.get(f, '')).replace(',', '.')  # Accept both dot and comma
            if not float_regex.match(val):
                return jsonify({'prediction': f"Invalid input for {f}: {val}"}), 400
            features.append(float(val))
        prediction = model.predict([features])[0]
        result = "Stable" if prediction == 1 else "Unstable"
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'prediction': f"Error: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
