from flask import Flask, jsonify, render_template
import time
import psutil
import threading
import requests
import mysql.connector

app = Flask(__name__)

# Variables to store network data
network_data = {
    "mb_new_received": 0,
    "mb_new_sent": 0,
    "mb_new_total": 0,
    "mb_total_received": 0,
    "mb_total_sent": 0,
    "mb_total": 0
}

# Array to store total download and upload data every minute
network_history = []

# Store the initial network counters when the application starts
initial_received = psutil.net_io_counters().bytes_recv
initial_sent = psutil.net_io_counters().bytes_sent
initial_total = initial_received + initial_sent

# Database connection
def db_connect():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Ijse@1234",
        database="bandwidthSystem"
    )

def insert_network_history(date_use, total_download, total_upload, total):
    db = db_connect()
    cursor = db.cursor()
    sql = "INSERT INTO history (date_use, total_download, total_upload, total) VALUES (%s, %s, %s, %s)"
    values = (date_use, total_download, total_upload, total)
    cursor.execute(sql, values)
    db.commit()
    cursor.close()
    db.close()

def get_ip_location():
    response = requests.get('https://ipinfo.io/json')
    data = response.json()
    return data

def update_network_data():
    global network_data, initial_received, initial_sent, initial_total, network_history

    last_received = initial_received
    last_sent = initial_sent
    last_total = initial_total
    last_minute = int(time.time() // 60)

    while True:
        byte_received = psutil.net_io_counters().bytes_recv
        byte_sent = psutil.net_io_counters().bytes_sent
        byte_total = byte_received + byte_sent

        new_received = byte_received - last_received
        new_sent = byte_sent - last_sent
        new_total = byte_total - last_total

        network_data["mb_new_received"] = new_received / 1024 / 1024
        network_data["mb_new_sent"] = new_sent / 1024 / 1024
        network_data["mb_new_total"] = new_total / 1024 / 1024

        # Increment the total counts
        network_data["mb_total_received"] += network_data["mb_new_received"]
        network_data["mb_total_sent"] += network_data["mb_new_sent"]
        network_data["mb_total"] += network_data["mb_new_total"]

        # Check if a minute has passed
        current_minute = int(time.time() // 60)
        if current_minute != last_minute:
            last_minute = current_minute

            # Store the data in network_history and database
            date_use = time.strftime("%Y-%m-%d")
            total_download = int(network_data["mb_total_received"])
            total_upload = int(network_data["mb_total_sent"])
            total = total_download + total_upload

            network_history.append({
                "time": time.strftime("%Y-%m-%d %H:%M:%S"),
                "total_received": total_download,
                "total_sent": total_upload
            })
            print(f"Time: {time.strftime('%Y-%m-%d %H:%M:%S')}, "
                  f"Total Received: {network_data['mb_total_received']:.2f} MB, "
                  f"Total Sent: {network_data['mb_total_sent']:.2f} MB")

            # Insert into database
            insert_network_history(date_use, total_download, total_upload, total)

        last_received = byte_received
        last_sent = byte_sent
        last_total = byte_total

        time.sleep(1)

@app.route('/network_data')
def get_network_data():
    return jsonify(network_data)

@app.route('/network_history')
def get_network_history():
    return jsonify(network_history)

@app.route('/')
def index():
    return render_template('Main.html')

@app.route('/ip_details')
def ip_details():
    ip_location = get_ip_location()
    return render_template('index.html', ip_location=ip_location)

if __name__ == '__main__':
    # Start the network data update in a separate thread
    thread = threading.Thread(target=update_network_data)
    thread.daemon = True
    thread.start()

    # Get IP location and print it to the terminal
    ip_location = get_ip_location()
    print(f"IP Location: {ip_location}")

    # Run the Flask web server on port 5001
    app.run(debug=True, port=5001)
