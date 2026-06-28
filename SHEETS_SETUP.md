# Connecting the Registration Form to Google Sheets

## Step 1 — Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) logged in as **icovriconference@gmail.com**
2. Create a new spreadsheet, name it **ICOVRI 10 Registrations**
3. In Row 1, add these headers exactly:
   ```
   Timestamp | Name | Title/Academic Degree | Affiliation | Email | Phone | Nationality | Participation Type | Abstract Submission | Payment Status
   ```

## Step 2 — Add the Apps Script

1. In the spreadsheet: **Extensions → Apps Script**
2. Delete any existing code and paste this:

```javascript
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp,
      data.name,
      data.lastName,
      data.email,
      data.phone,
      data.affiliation,
      data.country,
      data.type,
      data.room,
      data.paper,
      data.notes,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('ICOVRI 10 Registration endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. Click **Save** (floppy disk icon)

## Step 3 — Deploy

1. Click **Deploy → New deployment**
2. Click the ⚙️ gear next to "Select type" → choose **Web app**
3. Set:
   - **Description**: ICOVRI Registration
   - **Execute as**: Me (icovriconference@gmail.com)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Authorize when prompted (Allow)
6. **Copy the Web app URL** — it looks like:
   `https://script.google.com/macros/s/XXXXXXXX/exec`

## Step 4 — Paste the URL into the website

Open `js/form.js` and replace line 13:

```javascript
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```

With your copied URL:

```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXXXXX/exec';
```

Save, re-zip, and re-upload your website. Every registration will now appear
as a new row in the Google Sheet automatically.
