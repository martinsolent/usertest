/**
 * Receives results from the user testing tool and adds them to this Google Sheet.
 * One row per task, so you can filter and chart by task.
 *
 * Setup (once per sheet):
 * 1. Make a new Google Sheet. Extensions > Apps Script.
 * 2. Replace everything in Code.gs with this file and save.
 * 3. Deploy > New deployment > type "Web app".
 *    Execute as: Me. Who has access: Anyone.
 * 4. Copy the web app URL (ends in /exec) into the builder's
 *    "Apps Script web app URL" box.
 */

const HEADERS = [
  'Received', 'Test', 'Test folder', 'Participant', 'Task', 'Task title',
  'Outcome', 'How ticked off', 'Seconds', 'Clicks', 'Pages visited',
  'Comment', 'Screen', 'Browser', 'Started', 'Finished'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    const received = new Date();
    const rows = (data.tasks || []).map(t => [
      received,
      data.test || '',
      data.testId || '',
      data.participant || '',
      t.task,
      t.title,
      t.outcome,
      t.method,
      t.seconds,
      t.clicks,
      t.pages,
      data.comment || '',
      data.screen || '',
      data.browser || '',
      data.startedAt || '',
      data.finishedAt || ''
    ]);
    if (rows.length) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.length).setValues(rows);
    }
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err);
  } finally {
    lock.releaseLock();
  }
}

// Lets you check the URL works by opening it in a browser.
function doGet() {
  return ContentService.createTextOutput('The results receiver is running.');
}
