import asyncio
from bleak import BleakScanner

DEMO_MODE = True

async def scan_devices():
    devices = await BleakScanner.discover(return_adv=True)
    results = []

    for address, (device, adv) in devices.items():
        rssi = adv.rssi if adv.rssi is not None else -100
        distance = round(10 ** ((-59 - rssi) / (10 * 2)), 2)

        results.append({
            "name": device.name or "Unknown",
            "address": device.address,
            "rssi": rssi,
            "distance": distance
        })

    return results

def get_demo_devices():
    return [
        {
            "name": "iPhone 14",
            "address": "2C:09:8C:AA:BB:CC",
            "rssi": -45,
            "distance": 1.2
        },
        {
            "name": "Galaxy Watch",
            "address": "3C:5A:B4:DD:EE:FF",
            "rssi": -62,
            "distance": 3.5
        },
        {
            "name": "AirPods Pro",
            "address": "FC:58:FA:11:22:33",
            "rssi": -71,
            "distance": 6.8
        }
    ]

def get_devices():
    if DEMO_MODE:
        return get_demo_devices()

    try:
        return asyncio.run(scan_devices())
    except Exception as e:
        print("Bluetooth scan failed:", e)
        return get_demo_devices()