# Use Python 3.11 as the base image
FROM python:3.11

# Set the working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application files
COPY . .

# Expose the service port
EXPOSE 8001

# Run the Django application
CMD ["gunicorn", "--bind", "0.0.0.0:8001", "auth_service.wsgi:application"]
