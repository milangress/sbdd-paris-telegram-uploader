#!/bin/bash

# Build the Docker image
echo "Building Docker image..."
docker build -t milangress/sbdd-paris-telegram-uploader:latest .

# Ask if the user wants to push the image
read -p "Do you want to push the image to Docker Hub? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Pushing image to Docker Hub..."
  docker push milangress/sbdd-paris-telegram-uploader:latest
  echo "Image pushed successfully!"
fi

echo "Build completed!"
echo "To run the container, use:"
echo "docker run -d --name sbdd-paris-telegram-uploader -e BOT_TOKEN=your_telegram_bot_token -v /path/to/kirby/content:/app/kirby/content milangress/sbdd-paris-telegram-uploader:latest" 