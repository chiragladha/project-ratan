/* SEPARATE Apps Script project: Ratan Staff Studio.
   Never add this doGet or the read functions to the public enquiry receiver.
   Deploy executing as USER ACCESSING THE WEB APP; require Google sign-in.
   Script Properties: RATAN_SHEET_ID, RATAN_ALLOWED_STAFF (comma-separated emails).
   Each allowed user must already have access to the private spreadsheet. */
function staff_(){
  const email=String(Session.getActiveUser().getEmail()||'').trim().toLowerCase();
  const allowed=String(PropertiesService.getScriptProperties().getProperty('RATAN_ALLOWED_STAFF')||'').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
  if(!email||!allowed.includes(email))throw new Error('Access denied. Sign in with an approved Ratan staff account.');
  return email;
}
function book_(){staff_();const id=PropertiesService.getScriptProperties().getProperty('RATAN_SHEET_ID');if(!id)throw new Error('Staff studio is not configured.');return SpreadsheetApp.openById(id);}
function doGet(){try{staff_();return HtmlService.createHtmlOutputFromFile('Studio').setTitle('Ratan Staff Studio');}catch(e){return HtmlService.createHtmlOutput('<h1>Ratan staff access only</h1><p>Sign in with an approved account. Ask the Ratan owner to enable access.</p>');}}
function ratanSession(){return{email:staff_()};}
function ratanGetEnquiry(reference){
  staff_();reference=String(reference||'').trim();if(!/^[A-Za-z0-9-]{10,100}$/.test(reference))throw new Error('Enter the complete enquiry reference.');
  const sheet=book_().getSheetByName('Enquiries');if(!sheet||sheet.getLastRow()<2)throw new Error('No matching enquiry.');
  if(sheet.getLastRow()>20000)throw new Error('Lead index upgrade required; lookup stopped safely.');
  const heads=sheet.getRange(1,1,1,17).getDisplayValues()[0];if(heads[1]!=='Name'||heads[3]!=='Requirement'||heads[16]!=='Reference')throw new Error('Unexpected enquiry columns. Ask the owner to check setup.');
  const matches=sheet.getRange(2,17,sheet.getLastRow()-1,1).createTextFinder(reference).matchEntireCell(true).matchCase(true).findAll();
  if(matches.length!==1)throw new Error(matches.length?'Duplicate reference: desk review required.':'No matching enquiry.');
  const v=sheet.getRange(matches[0].getRow(),1,1,17).getDisplayValues()[0];
  return{version:2,reference:v[16],customer:v[1],brief:v[3],kind:v[8],quantityNote:v[4],delivery:v[5],revision:'01',source:'private-sheet'};
}
function ratanGetPriceSuggestions(items){
  staff_();if(!Array.isArray(items)||items.length>100)throw new Error('Invalid price request.');
  const sheet=book_().getSheetByName('PriceBook');if(!sheet||sheet.getLastRow()<2)return{suggestions:[],message:'No price book configured. Enter reviewed rates manually.'};
  const expected=['Material key','Specification','Unit','Unit rate','Tax %','Valid until','Currency'];
  if(sheet.getRange(1,1,1,7).getDisplayValues()[0].some((v,i)=>v!==expected[i]))throw new Error('PriceBook headers do not match the setup guide.');
  if(sheet.getLastRow()>10000)throw new Error('Price index upgrade required.');
  const rows=sheet.getRange(2,1,sheet.getLastRow()-1,7).getValues();const normalize=s=>String(s||'').trim().toLowerCase();const now=new Date();now.setHours(0,0,0,0);
  const suggestions=items.map((item,index)=>{const hits=rows.filter(r=>normalize(r[0])===normalize(item.name)&&normalize(r[1])===normalize(item.spec)&&normalize(r[2])===normalize(item.unit)&&String(r[6])===String(item.currency)&&r[3]!==''&&r[4]!==''&&Number.isFinite(Number(r[3]))&&Number(r[3])>=0&&Number.isFinite(Number(r[4]))&&Number(r[4])>=0&&Number(r[4])<=100&&r[5] instanceof Date&&r[5]>=now);if(hits.length!==1)return{index,matched:false,reason:hits.length?'Multiple current prices: review required':'No exact, current specification/unit/currency match'};return{index,matched:true,price:Number(hits[0][3]),tax:Number(hits[0][4]),validUntil:Utilities.formatDate(hits[0][5],Session.getScriptTimeZone(),'yyyy-MM-dd')};});
  return{suggestions};
}
