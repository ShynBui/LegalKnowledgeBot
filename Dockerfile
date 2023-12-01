FROM python:3.9-slim

WORKDIR /flask-server

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5050

# Chạy ứng dụng Flask
CMD ["python", "-m", "saleapp.index"]