# Guided user testing

A small user testing tool that runs on GitHub Pages. Testers open a link and see the website being tested, with a guide panel beside it. The panel gives one task at a time, reads each task out loud, and ticks it off when it's done. At the end, the results go to a Google Sheet, or the tester downloads a results file.

It's built for websites tested on a laptop or desktop. It doesn't work on phones, and it says so if someone opens it on one.

## What's in the folder

```
index.html          the page testers use
builder.html        forms for making and editing tests
apps-script/Code.gs the Google Sheets script that receives results
tests/
  project/          the test the tester opens by default
                    (it starts with a sample café prototype)
    test.json       the tasks, guide, messages and settings
    prototype/      the website being tested (plain HTML files)
```

## Putting it on GitHub Pages

1. Make a new repository on GitHub, for example `usertest`.
2. Upload everything in this folder to it (Add file › Upload files, then drag the files and folders in).
3. Go to Settings › Pages. Under "Branch" choose `main` and `/ (root)`, then press Save.
4. After a minute or two the test is live at
   `https://<your-username>.github.io/usertest/`
   (use your own repository name in place of `usertest`). It opens the sample test.

## Testing your own prototype

The tester always opens the test in `tests/project/`, so you never need to change `index.html` or rename folders. To swap in your own prototype:

1. On GitHub, open `tests/project/prototype/`, press **•••** at the top right and choose **Delete directory**, then **Commit changes**. This removes the sample café pages. (The `project` folder stays, because `test.json` is still in it.)
2. Open `tests/project/` and use **Add file › Upload files** to drag in a folder called `prototype` that holds your prototype. Its first page must be called `index.html`. Commit.
3. Open `builder.html?test=project` on your live site, e.g. `https://<your-username>.github.io/usertest/builder.html?test=project`. It loads the current test. Change the title, guide, welcome message and tasks for your prototype. Leave **Folder name** as `project`.
4. Press **Download test.json** and upload it to `tests/project/`. A file with the same name replaces the old one. Commit.
5. Wait a minute or two, then open your plain link (`https://<your-username>.github.io/usertest/`) and try the whole test yourself before sending it to testers.

To test another prototype later, repeat the same steps. Delete the old prototype folder first, so no old pages are left behind, and keep a copy of anything you want to keep.

**Preview as tester** in the builder lets you try a test before uploading test.json. The prototype files do need to be on the site already.

**More than one test at once?** Make another folder next to `project`, such as `tests/version2/` with its own `prototype/` and `test.json`, set the builder's Folder name to match, and send that test with `…/index.html?test=version2`.

**Working on your computer?** If you keep a copy of the repository on your computer (with GitHub Desktop, for example), do the same thing in the `tests/project` folder: delete the old prototype files, drop in your new `index.html`, replace `test.json`, then commit and push.

## How tasks get ticked off

Each task has one of three checks:

| Check | Use it when | What to type |
| --- | --- | --- |
| Reaches a page or section | The task ends on a page | `pay.html`, or `menu.html#vegan` for a section reached through a `#vegan` link |
| Clicks a button or link | The task ends with a click | The words on the button, e.g. `Add to basket`, or a CSS selector like `#add-flat-white` |
| Tester presses "I've done this" | Nothing on the page shows it's done (e.g. picking an option from a list) | Nothing |

Testers can always press "I've done this" or "I'm stuck, skip this task" as well.

Automatic checks only work when the prototype is inside the `prototype/` folder. If you give the start page as a link to another website, it still loads, but testers have to tick tasks off themselves, because browsers don't let one site watch another.

If two buttons have the same words (like several "Add to basket" buttons), give the right one an `id` in the HTML and use the selector, as in the sample test.

## Audio

By default each task is read out by the browser's built-in voice, so if you change the wording the audio changes too. Voices vary between computers. Chrome and Edge have the most natural ones.

To use your own recording, upload an MP3 to the test folder (e.g. `tests/project/audio/task1.mp3`), set the task's audio to "Play my own recording" and type `audio/task1.mp3`. If the file is missing, the browser voice reads the task instead.

Testers can turn the audio off with the speaker button.

## Sending results to a Google Sheet

1. Make a new Google Sheet, then go to Extensions › Apps Script.
2. Delete what's there, paste in everything from `apps-script/Code.gs`, and save.
3. Press Deploy › New deployment. Click the cog, choose **Web app**, set "Execute as" to **Me** and "Who has access" to **Anyone**, then Deploy. Google will ask you to allow access the first time.
4. Copy the web app URL (it ends in `/exec`).
5. In the builder, set "Where do results go?" to Google Sheet and paste the URL in.

Each finished test adds one row per task with the outcome, how it was ticked off, seconds taken, clicks, pages visited and the tester's comment.

If you change the script later, use Deploy › Manage deployments › Edit › New version, so the URL stays the same.

The sample test is set to "download" so it works without a sheet.

## Things to know

- Results that are saved to the sheet can't be checked from the tester's side (Google doesn't allow it), so testers are always offered a "Download a copy" button as a backup.
- Prototypes that use `localStorage` (like the sample basket) keep their data between testers on the same computer. If you're running a lab session, clear it between testers or add a reset button.
- Anyone with the Apps Script URL could send rows to your sheet. Keep the URL to your class and make a fresh sheet for each study.
