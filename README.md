# SBDD Paris Telegram Uploader Bot

A Telegram bot that helps upload content to Kirby CMS. This bot allows users to send photos, videos, audio, or text messages, which are then processed and saved to a Kirby CMS collection directory.

## Docker Setup

### Running the Container

The bot is available as a Docker image at `milangress/sbdd-paris-telegram-uploader`.

To run the container, use the following command:

```bash
docker run -d \
  --name sbdd-paris-telegram-uploader \
  -e BOT_TOKEN=your_telegram_bot_token \
  -v /path/to/your/kirby/content:/app/kirby/content \
  milangress/sbdd-paris-telegram-uploader:latest
```

Replace:
- `your_telegram_bot_token` with your actual Telegram bot token from BotFather
- `/path/to/your/kirby/content` with the absolute path to your Kirby content directory

### Using Docker Compose

Alternatively, you can use Docker Compose:

1. Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  telegram-bot:
    image: milangress/sbdd-paris-telegram-uploader:latest
    container_name: sbdd-paris-telegram-uploader
    restart: unless-stopped
    environment:
      - BOT_TOKEN=your_telegram_bot_token
    volumes:
      - /path/to/kirby/content:/app/kirby/content
```

2. Run with:

```bash
docker-compose up -d
```

## Building the Docker Image

If you want to build the image yourself:

```bash
# Clone the repository
git clone https://github.com/yourusername/sbdd-paris-telegram-uploader.git
cd sbdd-paris-telegram-uploader

# Build the image
docker build -t milangress/sbdd-paris-telegram-uploader:latest .

# Push to Docker Hub (optional)
docker push milangress/sbdd-paris-telegram-uploader:latest
```

## Bot Usage

Once the bot is running:

1. Start a conversation with your bot on Telegram
2. Send a photo, video, audio, or text message
3. Follow the prompts to provide additional information
4. The content will be saved to your Kirby content directory

## Environment Variables

- `BOT_TOKEN`: Your Telegram bot token (required)
- `ALLOWED_USER_IDS`: Optional comma-separated list of Telegram user IDs that can use the bot (leave empty to allow all users)

## Volumes

- `/app/kirby/content`: Mount your Kirby content directory here

## Logs and Troubleshooting

To view the logs:

```bash
docker logs sbdd-paris-telegram-uploader
```

## License

[MIT License](LICENSE)

## Features

- Upload photos, videos, audio, and text to Kirby CMS
- Interactive conversation flow with custom keyboards
- Collect metadata like descriptions, orientation, and tarot card associations
- Automatically organize uploads in the Kirby collection directory
- Create Kirby-compatible note.txt files with metadata

## Prerequisites

- [Bun](https://bun.sh/) installed
- A Telegram bot token (get from [@BotFather](https://t.me/BotFather))
- A Kirby CMS installation with a collection directory

## Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/sbdd-paris-telegram-uploader.git
   cd sbdd-paris-telegram-uploader
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env` file based on the `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your Telegram bot token and Kirby collection directory:

   ```bash
   BOT_TOKEN=your_telegram_bot_token_here
   KIRBY_COLLECTION_DIR=/path/to/your/kirby/collection/directory
   ALLOWED_USER_IDS=123456789,987654321  # Optional: restrict access to specific users
   ```

## Usage

1. Start the bot:

   ```bash
   bun run index.ts
   ```

2. Open your Telegram app and start a conversation with your bot.

3. Send a photo, video, audio, or text message to begin the upload process.

4. Follow the prompts to provide:
   - A description
   - Orientation (landscape or portrait)
   - A tarot card association

5. The bot will save the file and metadata to your Kirby CMS collection directory.

## Bot Commands

- `/start` - Start the bot and see the welcome menu
- `/menu` - Show the main menu
- `/reset` - Reset your current session
- `/help` - Show help information

## File Structure

- `index.ts` - Main bot file
- `src/config/index.ts` - Configuration and environment variables
- `src/handlers/` - Bot handlers for different functionalities
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions

## Author

Your Name
