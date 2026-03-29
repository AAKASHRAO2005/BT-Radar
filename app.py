import os
from flask import Flask, render_template, jsonify
from scanner import get_devices

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/scan")
def scan():
    try:
        devices = get_devices()
        return jsonify(devices)
    except Exception as e:
        return jsonify({
            "error": "Bluetooth scanning not available",
            "details": str(e)
        }), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)