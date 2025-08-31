#!/usr/bin/env node
// Autostart Next.js with host/port fallback and simple readiness check
const { spawn } = require('child_process');

const mode = process.argv[2] === 'start' ? 'start' : 'dev';
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const attempts = [
  { host: '127.0.0.1', port: 3010, label: 'ipv4' },
  { host: '0.0.0.0', port: 3020, label: 'open' },
  { host: 'localhost', port: 3012, label: 'localhost' },
];

function runAttempt({ host, port, label }) {
  return new Promise((resolve) => {
  const cmd = `${npx} next ${mode} ${mode === 'dev' ? '--turbopack ' : ''}-H ${host} -p ${port}`;
  const child = spawn(cmd, { stdio: ['inherit', 'pipe', 'pipe'], shell: true });

    let resolved = false;
    const onData = (buf) => {
      const s = buf.toString();
      process.stdout.write(s);
      if (s.includes('Local:') || /ready in/i.test(s)) {
        if (!resolved) {
          resolved = true;
          console.log(`\n✔ Using ${label} → http://${host}:${port}`);
          resolve({ child, host, port, label });
        }
      }
    };

    child.stdout.on('data', onData);
    child.stderr.on('data', (b) => process.stderr.write(b.toString()));
    child.on('exit', (code) => {
      if (!resolved) resolve(null);
    });

    // If not ready within 8s, kill and fallback
    const t = setTimeout(() => {
      if (!resolved) {
        try { child.kill('SIGTERM'); } catch { /* noop */ }
      }
    }, 8000);

    // Keep parent alive when child is ready
    process.on('SIGINT', () => child.kill('SIGINT'));
    process.on('SIGTERM', () => child.kill('SIGTERM'));
  });
}

(async () => {
  for (const opt of attempts) {
    const res = await runAttempt(opt);
    if (res) return; // Keep process attached to child
    console.log(`✖ Failed on ${opt.host}:${opt.port}, trying next...`);
  }
  console.error('No attempt succeeded. Check VPN/firewall/proxy and try again.');
  process.exit(1);
})();
