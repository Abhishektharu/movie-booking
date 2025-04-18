import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR = path.join(__dirname, '..', 'logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const formatLogEntry = (message) => {
  const baseLog = {
    timestamp: new Date().toISOString(),
    ...message
  };

  // Format based on log type
  switch (message.type) {
    case 'emailSent':
      return {
        ...baseLog,
        status: 'SUCCESS',
        deliveryTime: `${(new Date(message.deliveredAt) - new Date(message.sentAt))}ms`
      };
    case 'emailError':
      return {
        ...baseLog,
        status: 'FAILED'
      };
    default:
      return baseLog;
  }
};

const logToFile = (filename, message) => {
  const formattedMessage = formatLogEntry(message);
  const logEntry = `[${formattedMessage.timestamp}] ${JSON.stringify(formattedMessage)}\n`;
  
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