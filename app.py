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
            "error": "Bluetooth scanning is not available on this server",
            "details": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)