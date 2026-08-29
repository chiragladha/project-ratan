/*
  Ratan enquiry receiver for Google Apps Script.
  Spreadsheet: https://docs.google.com/spreadsheets/d/1_qviXYk4F8UlkAKpKfn9JCDQfLzEEnuyq493CtMPVMw/edit

  Setup:
  1. In the spreadsheet: Extensions → Apps Script.
  2. Replace the default code with this file and save.
  3. Deploy → New deployment → Web app.
  4. Execute as: Me. Who has access: Anyone.
  5. Copy the Web app URL into config.js as enquiryEndpoint.
*/
const SHEET_ID = '1_qviXYk4F8UlkAKpKfn9JCDQfLzEEnuyq493CtMPVMw';
const TAB_NAME = 'Enquiries';

function doPost(event) {
  const sheet = getEnquirySheet_();
  const data = event.parameter || {};
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.phone || '',
    data.requirement || '',
    data.quantity || '',
    data.location || 'Ahmedabad',
    data.source || 'Ratan website'
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getEnquirySheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(TAB_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(TAB_NAME);
    sheet.appendRow(['Received at', 'Name', 'Phone', 'Requirement', 'Quantity / project size', 'Location', 'Source']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
