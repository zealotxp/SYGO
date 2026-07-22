// Headless interactive test: load ai.html, click first suggestion, wait, capture rendered DOM
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const tmpHtml = '/tmp/ai_after.html';
const tmpProfile = '/tmp/chrome_aitest';

if (fs.existsSync(tmpHtml)) fs.unlinkSync(tmpHtml);

const cmd = `"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu --no-sandbox --user-data-dir="${tmpProfile}" --virtual-time-budget=8000 --dump-dom "http://127.0.0.1:8099/ai.html" 2>/dev/null`;

exec(cmd, (err, stdout) => {
  if (err) { console.error('chrome err:', err); process.exit(1); }
  fs.writeFileSync(tmpHtml, stdout);
  // Check for messages rendered (welcome hidden, ai-messages visible with at least 2 bubbles)
  const userBubbles = (stdout.match(/ai-msg-bubble user/g) || []).length;
  const aiBubbles = (stdout.match(/ai-msg-bubble ai/g) || []).length;
  const welcomeVisible = stdout.match(/id="aiWelcome"[^>]*style="display:none"/) ? 0 : 1;
  console.log('After 8s of virtual time:');
  console.log('  user bubbles:', userBubbles);
  console.log('  AI bubbles (incl typing):', aiBubbles);
  console.log('  welcome still visible:', welcomeVisible);
});
