let devicePositions = {};
let deviceTrails = {};

// Popup
function showPopup(device) {
  document.getElementById("popup-name").innerText =
    device.name || "Unknown Device";

  document.getElementById("popup-address").innerText = device.address;
  document.getElementById("popup-rssi").innerText = device.rssi;
  document.getElementById("popup-distance").innerText = `${device.distance} m`;
  document.getElementById("popup-manufacturer").innerText = getManufacturer(
    device.address
  );

  const angle = devicePositions[device.address] || 0;
  document.getElementById("popup-direction").innerText =
    getDirectionFromAngle(angle);

  document.getElementById("popup-classification").innerText =
    classifyDevice(device);

  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

// Device type
function getDeviceType(name) {
  if (!name) return "📡";

  name = name.toLowerCase();

  if (name.includes("phone") || name.includes("iphone")) return "📱";
  if (name.includes("watch")) return "⌚";
  if (
    name.includes("buds") ||
    name.includes("airpods") ||
    name.includes("headphone")
  )
    return "🎧";
  if (name.includes("laptop") || name.includes("pc")) return "💻";
  if (name.includes("tablet") || name.includes("ipad")) return "📲";

  return "📡";
}

// Manufacturer detection
function getManufacturer(mac) {
  const prefix = mac.toUpperCase().substring(0, 8);

  const vendors = {
    "2C:09:8C": "Apple 🍎",
    "3C:5A:B4": "Samsung 📱",
    "FC:58:FA": "Apple 🍎",
    "A4:C3:F0": "Samsung 📱",
    "00:1A:7D": "Bluetooth Device 📡",
  };

  const firstByte = parseInt(mac.substring(0, 2), 16);

  if ((firstByte & 2) !== 0) return "Private Device 🔒";

  return vendors[prefix] || "Unknown 🛰️";
}

// Direction from radar angle
function getDirectionFromAngle(angle) {
  const directions = ["E", "NE", "N", "NW", "W", "SW", "S", "SE"];
  const index = Math.round(angle / (Math.PI / 4)) % 8;
  return directions[index];
}

// Signal bars
function getSignalBars(rssi) {
  if (rssi >= -50) return 4;
  if (rssi >= -65) return 3;
  if (rssi >= -80) return 2;
  return 1;
}

function renderSignalBars(rssi) {
  const bars = getSignalBars(rssi);
  let html = `<div class="signal-bars">`;

  for (let i = 1; i <= 4; i++) {
    html += `<span class="bar ${i <= bars ? "active" : ""}"></span>`;
  }

  html += `</div>`;
  return html;
}

// Rule-based smart classification
function classifyDevice(device) {
  const name = (device.name || "").toLowerCase();
  const manufacturer = getManufacturer(device.address).toLowerCase();

  if (name.includes("iphone") || name.includes("phone")) return "Smartphone";
  if (name.includes("watch")) return "Smartwatch";
  if (
    name.includes("buds") ||
    name.includes("airpods") ||
    name.includes("headphone")
  )
    return "Audio Device";
  if (name.includes("laptop") || name.includes("pc")) return "Computer";
  if (name.includes("tablet") || name.includes("ipad")) return "Tablet";
  if (manufacturer.includes("apple")) return "Apple Device";
  if (manufacturer.includes("samsung")) return "Samsung Device";

  if (device.rssi >= -55) return "Nearby Active Device";
  if (device.rssi >= -75) return "Medium Range Device";

  return "Unknown Device";
}

// Scan
async function scanDevices() {
  const btn = document.getElementById("scanBtn");
  const radar = document.querySelector(".radar");
  const table = document.getElementById("deviceTable");
  const dots = document.getElementById("dots");
  const ping = document.getElementById("ping");

  btn.innerText = "Scanning...";
  btn.disabled = true;
  radar.classList.add("active");

  try {
    const response = await fetch("/scan");
    const devices = await response.json();

    table.innerHTML = "";
    dots.innerHTML = "";

    devices.forEach((device) => {
      // Keep same direction for same device
      let angle =
        devicePositions[device.address] ?? Math.random() * 2 * Math.PI;

      devicePositions[device.address] = angle;

      const radius = Math.min(device.distance * 80, 140);
      const center = radar.offsetWidth / 2;

      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);

      // Save trail history
      if (!deviceTrails[device.address]) {
        deviceTrails[device.address] = [];
      }

      deviceTrails[device.address].push({ x, y });

      // Limit trail length
      if (deviceTrails[device.address].length > 5) {
        deviceTrails[device.address].shift();
      }

      // Draw trail dots
      deviceTrails[device.address].forEach((point, index) => {
        const trailDot = document.createElement("div");
        trailDot.className = "trail";
        trailDot.style.position = "absolute";
        trailDot.style.left = `${point.x}px`;
        trailDot.style.top = `${point.y}px`;
        trailDot.style.transform = "translate(-50%, -50%)";
        trailDot.style.opacity =
          (index + 1) / deviceTrails[device.address].length;

        dots.appendChild(trailDot);
      });

      // Wrapper for dot + label
      const wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.left = `${x}px`;
      wrapper.style.top = `${y}px`;
      wrapper.style.transform = "translate(-50%, -50%)";
      wrapper.style.textAlign = "center";
      wrapper.style.cursor = "pointer";
      wrapper.onclick = () => showPopup(device);

      // Device dot
      const dot = document.createElement("div");
      dot.className = "dot";

      if (device.distance < 2) {
        dot.style.background = "lime";
        dot.style.color = "lime";
      } else if (device.distance < 5) {
        dot.style.background = "yellow";
        dot.style.color = "yellow";
      } else {
        dot.style.background = "red";
        dot.style.color = "red";
      }

      // Device label
      const label = document.createElement("div");
      label.className = "label";
      label.innerText =
        getDeviceType(device.name) +
        " " +
        (device.name
          ? device.name.slice(0, 8)
          : getManufacturer(device.address).split(" ")[0]);

      wrapper.appendChild(dot);
      wrapper.appendChild(label);
      dots.appendChild(wrapper);

      // Direction + classification
      const direction = getDirectionFromAngle(angle);
      const classification = classifyDevice(device);

      // Table row
      table.innerHTML += `
        <tr>
          <td>${device.name || "Unknown"}</td>
          <td>${device.address}</td>
          <td>${device.rssi}</td>
          <td>${device.distance} m</td>
          <td>${direction}</td>
          <td>${renderSignalBars(device.rssi)}</td>
          <td>${classification}</td>
        </tr>
      `;
    });

    if (devices.length > 0 && ping) {
      ping.currentTime = 0;
      ping.play().catch(() => {});
    }

    if (devices.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="7">No devices found</td>
        </tr>
      `;
    }
  } catch (error) {
    console.error("Scan failed:", error);
    table.innerHTML = `
      <tr>
        <td colspan="7">Error scanning devices</td>
      </tr>
    `;
  } finally {
    setTimeout(() => {
      radar.classList.remove("active");
    }, 2000);

    btn.innerText = "🔍 Scan Devices";
    btn.disabled = false;
  }
}