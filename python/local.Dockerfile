# arduino-reader/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY simulated.py .
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "simulated.py"]
