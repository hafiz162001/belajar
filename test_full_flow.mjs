import { spawn } from 'child_process';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-cache',
  'http://localhost:3000/?t=' + Date.now()
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const targets = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Runtime.enable');
  await send('Log.enable');

  await new Promise(r => setTimeout(r, 1000));

  // 1. Start exam CPNS
  console.log("Testing Exam CPNS Start...");
  await send('Runtime.evaluate', { expression: 'window.AptitudeApp.switchView("exams")' });
  const startExamRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector(".btn-start-exam-card[data-exam-type='CPNS']");
      if (btn) btn.click();
      return {
        view: window.AptitudeApp.currentView,
        title: document.getElementById("quiz-session-title")?.textContent,
        questionCount: window.AptitudeApp.examState?.questions?.length
      };
    })()`,
    returnByValue: true
  });
  console.log("Exam CPNS result:", startExamRes.result.value);

  // 2. Test selecting an option
  console.log("Testing Option Selection...");
  const optionRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const opt = document.querySelector(".option-item");
      if (opt) opt.click();
      return {
        hasSelectedClass: opt?.classList.contains("selected"),
        recordedAnswer: window.AptitudeApp.examState?.answers[0]
      };
    })()`,
    returnByValue: true
  });
  console.log("Option selection result:", optionRes.result.value);

  // 3. Test Material Modal
  console.log("Testing Material Modal...");
  await send('Runtime.evaluate', { expression: 'window.AptitudeApp.switchView("materials")' });
  const matRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const card = document.querySelector(".material-card");
      if (card) card.click();
      const modal = document.getElementById("material-modal");
      return {
        modalDisplay: modal?.style.display,
        modalTitle: document.getElementById("modal-material-title")?.textContent
      };
    })()`,
    returnByValue: true
  });
  console.log("Material modal result:", matRes.result.value);

  ws.close();
} catch (err) {
  console.error(err);
} finally {
  chrome.kill();
  process.exit(0);
}
