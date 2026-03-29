import asyncio
from bleak import BleakScanner

def calculate_distance(rssi):
    tx_power = -59
    n = 2.5
    return round(10 ** ((tx_power - rssi) / (10 * n)), 2)

async def scan_devices():
    devices = await BleakScanner.discover(return_adv=True)
    result = []

    for address, (device, adv) in devices.items():
        result.append({
            "name": device.name or None,
            "address": device.address,
            "rssi": adv.rssi,
            "distance": calculate_distance(adv.rssi)
        })

    return result


def get_devices():
    return asyncio.run(scan_devices())