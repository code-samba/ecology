import time
import requests
import datetime
import socketio
import random

API_URL = "http://backend:3001/ecology"
SOCKET_URL = "http://backend:3001"

sio = socketio.Client()

@sio.event
def connect():
    print("Conectado ao backend via WebSocket (simulador)")

@sio.event
def disconnect():
    print("Desconectado do WebSocket")

sio.connect(SOCKET_URL)

def should_send_now():
    now = datetime.datetime.now()
    return now.minute in [0, 30] and now.second < 5

def gerar_dados_simulados():
    return {
        "temperatura": round(random.uniform(20.0, 30.0), 2),
        "umidade": round(random.uniform(40.0, 60.0), 2),
        "calibragem": round(random.uniform(40.0, 60.0), 2),
        "pressao": round(random.uniform(1000.0, 1020.0), 2),
        "altitude": round(random.uniform(100.0, 150.0), 2),
        "luminosidade": round(random.uniform(0.0, 1012.0), 2),
        "bomba": bool(random.getrandbits(1)),
        "lampada": bool(random.getrandbits(1))
    }

try:
    last_sent_minute = -1

    print("Simulador de dados iniciado...")

    while True:
        simulated_data = gerar_dados_simulados()
        print("Simulado:", simulated_data)

        try:
            sio.emit("arduino-data", simulated_data)
        except Exception as e:
            print("Erro ao enviar WebSocket:", e)

        if should_send_now() and datetime.datetime.now().minute != last_sent_minute:
            try:
                print("Enviando dados simulados para o backend...")
                response = requests.post(API_URL, json=simulated_data)
                print("Resposta:", response.status_code)
                last_sent_minute = datetime.datetime.now().minute
            except Exception as e:
                print("Erro ao enviar para o backend:", e)

        print("-" * 40)
        time.sleep(3)

except KeyboardInterrupt:
    print("\nSimulador encerrado.")
