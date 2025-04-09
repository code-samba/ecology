import serial
import time
import requests
import datetime
import socketio

serialPort = '/dev/rfcomm0'
baudrate = 9600
API_URL = "http://backend:3001/python"
SOCKET_URL = "http://backend:3001"  # porta do NestJS WebSocket Gateway

# cria cliente socket.io
sio = socketio.Client()

@sio.event
def connect():
    print("Conectado ao backend via WebSocket (socket.io)")

@sio.event
def disconnect():
    print("Desconectado do WebSocket")

sio.connect(SOCKET_URL)

def should_send_now():
    now = datetime.datetime.now()
    return now.minute in [0, 30] and now.second < 5

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

            if should_send_now() and datetime.datetime.now().minute != last_sent_minute:
                try:
                    print("Enviando dados para o backend...")
                    response = requests.post(API_URL, json=arduinoData)
                    print("Resposta:", response.status_code)
                    last_sent_minute = datetime.datetime.now().minute
                except Exception as e:
                    print("Erro ao enviar para o backend:", e)

            print("-" * 40)

except serial.SerialException as e:
    print("Erro ao acessar a porta serial:", e)

except KeyboardInterrupt:
    print("\nEncerrando a leitura.")