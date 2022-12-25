import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const PASSWORD = process.env.PASSWORD;

function decryptAdvanced(text: string, password: string, algorithm = 'aes256') {
  const key = crypto
    .createHash('sha256')
    .update(password)
    .digest();
  const [ivText, hash] = text.split(':');
  const iv = Buffer.from(ivText, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decryptedMessage = decipher.update(hash, 'hex', 'utf-8') + decipher.final('utf8');
  return decryptedMessage.toString();
}

const ENC_REGEXP = /ENC\(([a-f0-9:]+)\)/g;

interface LoadConfigOptions {
  configPath: string;
  file: string;
  type: string;
}

function loadConfig(options: LoadConfigOptions): string {
  if (!PASSWORD) {
    throw new Error('zoso-loader: no PASSWORD defined');
  }

  const file = fs.readFileSync(path.join(options.configPath, `${options.file}-config.${options.type}`)).toString('utf-8');
  let finalFile = file;
  let result: RegExpExecArray|null;

  while(result = ENC_REGEXP.exec(file)) {
    if (result[1]) {
      const decrypted = decryptAdvanced(result[1], PASSWORD);
      finalFile = finalFile.replace(result[0], decrypted);
    }
  }

  return finalFile;
}

export default {
  loadConfig,
};
