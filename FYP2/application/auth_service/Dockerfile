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

# Expose port 8000 for Django
EXPOSE 8000

# Set environment variables (modify as needed)
ENV PYTHONUNBUFFERED=1

# Run Django migrations and start the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "auth_service.wsgi:application"]
