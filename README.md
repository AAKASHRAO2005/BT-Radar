# 📡 Bluetooth Radar Scanner

A **real-time Bluetooth device tracking web application** that visualizes nearby devices using an interactive radar system.
Built with modern UI and smart device analysis features.

---

## 🚀 Features

* 📡 **Live Radar Visualization** – Detect nearby Bluetooth devices in real-time
* 📍 **Direction Mapping** – Shows direction (N, NE, E, etc.) of devices
* 📶 **Signal Strength Indicator** – RSSI-based signal bars UI
* 🤖 **Smart Device Classification** – Identifies device type (Phone, Watch, Audio, etc.)
* 🧠 **Manufacturer Detection** – Based on MAC address prefix
* 🎯 **Device Tracking Trails** – Shows movement history on radar
* 🔔 **Audio Feedback** – Plays sound when devices are detected
* 📊 **Dynamic Table View** – Displays all device details clearly
* 🎨 **Modern UI/UX** – Glassmorphism + animated radar interface

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Flask (Python)
* **Visualization:** Custom Radar UI (DOM manipulation)
* **Audio:** HTML5 Audio API

---

## 📂 Project Structure

```
BT Radar/
│
├── static/
│   ├── style.css
│   ├── script.js
│   ├── BT.png
│   └── ping.mp3
│
├── templates/
│   └── index.html
│
├── scanner.py / app.py
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Create Virtual Environment (Optional)

```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

### 3️⃣ Install Dependencies

```bash
pip install flask
```

### 4️⃣ Run the Application

```bash
python app.py
```

### 5️⃣ Open in Browser

```
http://127.0.0.1:5000
```

---

## 📸 Preview

> Displays nearby Bluetooth devices in a radar-style interface with direction, signal strength, and classification.

---

## 🧠 How It Works

* Backend scans nearby Bluetooth devices and returns JSON data
* Frontend processes device data and maps positions on radar
* RSSI values determine distance and signal strength
* Direction is calculated using angular mapping
* Rule-based logic classifies devices intelligently

---

## 💼 Resume Highlights

* Built a **real-time Bluetooth tracking system** with interactive radar visualization
* Implemented **RSSI-based signal strength and distance estimation**
* Designed **intelligent rule-based device classification system**
* Developed a **modern responsive UI with animations and data visualization**

---

## 🔮 Future Improvements

* 🌐 Real-time continuous scanning
* 📊 Dashboard analytics
* 📁 Export device data (CSV/JSON)
* 🤖 ML-based device classification
* 📍 More accurate distance calculation
* 📱 Mobile support

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
