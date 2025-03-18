FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8002

CMD ["gunicorn", "--bind", "0.0.0.0:8002", "institutes_service.wsgi:application"]
