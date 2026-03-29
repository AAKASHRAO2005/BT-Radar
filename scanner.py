import asyncio
from bleak import BleakScanner

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

def get_devices():
    try:
        return asyncio.run(scan_devices())
    except Exception as e:
        print("Bluetooth scan failed:", e)
        return []