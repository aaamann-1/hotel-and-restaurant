import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const children = [
  spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1'], {
    cwd: projectRoot,
    stdio: 'inherit',
  }),
  spawn(process.execPath, ['--watch', 'server.js'], {
    cwd: path.join(projectRoot, 'server'),
    stdio: 'inherit',
  }),
];

let stopping = false;
function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (child.exitCode === null) child.kill();
  }
  setTimeout(() => process.exit(code), 300);
}

for (const child of children) {
  child.on('error', (error) => {
    console.error('Could not start a Royal Stay development service:', error);
    shutdown(1);
  });
  child.on('exit', (code) => {
    if (!stopping) shutdown(code || 1);
  });
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
