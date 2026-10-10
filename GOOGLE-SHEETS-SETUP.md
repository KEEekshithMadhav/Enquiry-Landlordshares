# Google Sheets Webhook Setup Guide

Follow these quick steps to send leads automatically to your Google Sheet alongside Wylto CRM:

---

### Step 1: Prepare your Google Sheet
1. Create a new Google Sheet (or open your existing lead sheet).
2. Add these column headers in row 1:
   - **A1**: `Timestamp`
   - **B1**: `Name`
   - **C1**: `Phone Number`
   - **D1**: `Email`
   - **E1**: `Budget`
   - **F1**: `Purpose`
   - **G1**: `Message / Requirements`
   - **H1**: `Source`
   - **I1**: `Campaign`
   - **J1**: `Landing Page`

---

### Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions > Apps Script** in the top menu.
2. Delete any existing code in `Code.gs` and paste the following:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phoneNumber || '',
      data.email || '',
      data.budget || '',
      data.purpose || '',
      data.message || '',
      data.source || '',
      data.utmCampaign || '',
      data.landingPage || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

### Step 3: Deploy as Web App
1. Click the blue **Deploy** button (top right) > **New deployment**.
2. Click the gear icon ⚙ next to "Select type" and choose **Web app**.
3. Fill in settings:
   - **Description**: `LandlordShares Lead Capture`
   - **Execute as**: `Me (<your-email>)`
   - **Who has access**: `Anyone` *(Important: Select 'Anyone' so the API can post leads)*
4. Click **Deploy**.
5. Copy the generated **Web App URL** (looks like `https://script.google.com/macros/s/.../exec`).

---

### Step 4: Add to Environment Variables
1. In your local `.env.local` file:
   ```env
   GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
2. In your deployment platform (Vercel, etc.):
   - Go to **Project Settings > Environment Variables**.
   - Add `GOOGLE_SHEET_WEBHOOK_URL` with your copied URL.
