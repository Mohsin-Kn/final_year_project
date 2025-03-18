# Use an official Python runtime as a parent image
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project into the container
COPY . .

# # Copy .env.db file into the container (so Django can use it)
# COPY ../.env.db .env

# Expose port 8001 for Django
EXPOSE 8001

# Set environment variables (modify as needed)
ENV PYTHONUNBUFFERED=1

# Run Django migrations and start the application
# CMD ["gunicorn", "--bind", "0.0.0.0:8001", "institutes_service.wsgi:application"]
CMD ["sh", "-c", "python3 manage.py makemigrations && python3 manage.py migrate && gunicorn --bind 0.0.0.0:8001 --forwarded-allow-ips='*' institutes_service.wsgi:application"]
