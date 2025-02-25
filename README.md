# Kirby CMS Telegram Uploader Bot

A Telegram bot built with Bun and GrammY to simplify uploading files to a Kirby CMS installation.

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

## License

MIT

## Author

Your Name
