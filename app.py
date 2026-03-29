from flask import Flask, render_template, jsonify
from scanner import get_devices

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/scan")
def scan():
    devices = get_devices()
    return jsonify(devices)

if __name__ == "__main__":
    app.run(debug=True)