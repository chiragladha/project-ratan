/* OPTIONAL PRIVATE SHEET INTEGRATION. Add this as a separate file in the
   spreadsheet-bound Apps Script project. No web deployment and no public read API.
   Reload the Sheet, select an Enquiries row, use Ratan > Export selected enquiry.
   If this project already has onOpen(), merge the menu line into it. */
function onOpen(){SpreadsheetApp.getUi().createMenu('Ratan').addItem('Export selected enquiry','exportRatanEnquiry').addToUi();}
function exportRatanEnquiry(){
  const sheet=SpreadsheetApp.getActiveSheet(),row=sheet.getActiveRange().getRow();
  if(sheet.getName()!=='Enquiries'||row<2){SpreadsheetApp.getUi().alert('Select a customer row in Enquiries first.');return;}
  const values=sheet.getRange(row,1,1,17).getDisplayValues()[0];
  const data={version:1,reference:values[16]||values[7],customer:values[1],brief:values[3],revision:'01'};
  if(!data.reference){SpreadsheetApp.getUi().alert('This row has no enquiry reference. Assign one before exporting.');return;}
  const encoded=Utilities.base64Encode(JSON.stringify(data),Utilities.Charset.UTF_8);
  const html='<!doctype html><body style="font:16px system-ui;padding:20px;color:#152b23;background:#f6f3ec"><h2>Private enquiry export</h2><p>This download contains customer details. Import it into Ratan Brochure Studio; never put it in a public repository.</p><a download="ratan-enquiry.json" href="data:application/json;base64,'+encoded+'">Download selected enquiry</a></body>';
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(450).setHeight(280),'Ratan · enquiry export');
}
