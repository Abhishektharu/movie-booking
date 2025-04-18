import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR = path.join(__dirname, '..', 'logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const logToFile = (filename, message) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${JSON.stringify(message)}\n`;
  
  fs.appendFile(
    path.join(LOG_DIR, filename),
    logEntry,
    (err) => {
      if (err) console.error('Error writing to log file:', err);
    }
  );
};

export const emailLogger = {
  info: (message) => logToFile('email.log', { level: 'info', ...message }),
  error: (message) => logToFile('error.log', { level: 'error', ...message })
};