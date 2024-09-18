# Use the official Python image as the base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy requirements.txt to the working directory
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install gunicorn
RUN pip install gunicorn

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that Django runs on
EXPOSE 8000

# Set environment variables
ENV DJANGO_SETTINGS_MODULE=django_backend.settings
ENV PYTHONUNBUFFERED=1

# Command to run the Django app
CMD ["gunicorn", "django_backend.wsgi:application", "--bind", "0.0.0.0:8000"]