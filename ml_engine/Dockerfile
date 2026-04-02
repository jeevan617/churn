# Use official Python runtime as a parent image
FROM python:3.10-slim-buster

# Set environment variables for production
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV MODEL_VERSION "v2.0.1"

# Set work directory
WORKDIR /app

# Install system dependencies (needed for certain ML compilation steps)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies separately for layer caching
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the actual ML engine source code
COPY . .

# Expose the API port
EXPOSE 8000

# Start the highly concurrent Uvicorn ASGI server
CMD ["uvicorn", "inference_api:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
