import serial
import time
import requests
import datetime
import socketio

serialPort = '/dev/rfcomm0'
baudrate = 9600
SOCKET_URL = "http://backend:3001"

sio = socketio.Client()

@sio.event
def connect():
    print("Conectado ao backend via WebSocket (socket.io)")

@sio.event
def disconnect():
    print("Desconectado do WebSocket")

sio.connect(SOCKET_URL)

try:
    arduino = serial.Serial(serialPort, baudrate, timeout=1)
    time.sleep(2)
    last_sent_minute = -1

    print("Lendo dados do Arduino...")

    while True:
        if arduino.in_waiting > 0:
            line = arduino.readline().decode('utf-8').strip()
            print("Recebido bruto:", line)

            data = line.split(',')
            arduinoData = {}
            for item in data:
                if ':' in item:
                    key, value = item.split(':')
                    try:
                        arduinoData[key] = float(value) if '.' in value or value.isdigit() else value
                    except:
                        arduinoData[key] = value

            try:
                sio.emit("arduino-data", arduinoData)
            except Exception as e:
                print("Erro ao enviar WebSocket:", e)

            print("-" * 40)

except serial.SerialException as e:
    print("Erro ao acessar a porta serial:", e)

except KeyboardInterrupt:
    print("\nEncerrando a leitura.")