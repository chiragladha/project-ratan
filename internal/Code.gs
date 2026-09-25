/* Separate staff app. Advanced Sheets v4 uses spreadsheets.readonly, not SpreadsheetApp. */
function staff_(){
  const email=String(Session.getActiveUser().getEmail()||'').trim().toLowerCase();
  const allowed=String(PropertiesService.getScriptProperties().getProperty('RATAN_ALLOWED_STAFF')||'').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
  if(!email||!allowed.includes(email))throw Error('Access denied. Sign in with an approved Ratan staff account.');
  return email;
}
function book_(){staff_();const id=PropertiesService.getScriptProperties().getProperty('RATAN_SHEET_ID');if(!id)throw Error('Staff studio is not configured.');return id;}
function values_(id,range,raw){return Sheets.Spreadsheets.Values.get(id,range,{valueRenderOption:raw?'UNFORMATTED_VALUE':'FORMATTED_VALUE',dateTimeRenderOption:'SERIAL_NUMBER'}).values||[];}
function tab_(id,name,limit){const tabs=Sheets.Spreadsheets.get(id,{fields:'sheets(properties(title,gridProperties(rowCount)))'}).sheets||[];const found=tabs.find(s=>s.properties.title===name);if(found&&found.properties.gridProperties.rowCount>limit)throw Error('Sheet index upgrade required; lookup stopped safely.');return found;}
function doGet(){try{staff_();return HtmlService.createHtmlOutputFromFile('Studio').setTitle('Ratan Staff Studio');}catch(e){return HtmlService.createHtmlOutput('<h1>Ratan staff access only</h1><p>Sign in with an approved account. Ask the Ratan owner to enable access.</p>');}}
function ratanSession(){return{email:staff_()};}
function ratanGetEnquiry(reference){
  staff_();reference=String(reference||'').trim();if(!/^[A-Za-z0-9-]{10,100}$/.test(reference))throw Error('Enter the complete enquiry reference.');
  const id=book_();if(!tab_(id,'Enquiries',20000))throw Error('No matching enquiry.');
  const heads=values_(id,'Enquiries!A1:Q1')[0]||[];if(heads[1]!=='Name'||heads[3]!=='Requirement'||heads[16]!=='Reference')throw Error('Unexpected enquiry columns. Ask the owner to check setup.');
  const refs=values_(id,'Enquiries!Q2:Q');const matches=[];refs.forEach((r,i)=>{if(String(r[0]||'')===reference)matches.push(i+2);});
  if(matches.length!==1)throw Error(matches.length?'Duplicate reference: desk review required.':'No matching enquiry.');
  const row=matches[0],v=values_(id,'Enquiries!A'+row+':Q'+row)[0]||[];
  return{version:2,reference:v[16],customer:v[1]||'',brief:v[3]||'',kind:v[8]||'',quantityNote:v[4]||'',delivery:v[5]||'',revision:'01',source:'private-sheet'};
}
function ratanGetPriceSuggestions(items){
  staff_();if(!Array.isArray(items)||items.length>100)throw Error('Invalid price request.');
  const id=book_();if(!tab_(id,'PriceBook',10000))return{suggestions:[],message:'No price book configured. Enter reviewed rates manually.'};
  const all=values_(id,'PriceBook!A1:G',true),expected=['Material key','Specification','Unit','Unit rate','Tax %','Valid until','Currency'];
  if(!all.length||expected.some((v,i)=>all[0][i]!==v))throw Error('PriceBook headers do not match the setup guide.');
  const rows=all.slice(1),normalize=s=>String(s||'').trim().toLowerCase();
  const today=Utilities.formatDate(new Date(),Session.getScriptTimeZone(),'yyyy-MM-dd');
  const validDate=r=>typeof r[5]==='number'&&Number.isFinite(r[5])?new Date(Math.round((r[5]-25569)*86400000)).toISOString().slice(0,10):'';
  return{suggestions:items.map((item,index)=>{const hits=rows.filter(r=>normalize(r[0])===normalize(item.name)&&normalize(r[1])===normalize(item.spec)&&normalize(r[2])===normalize(item.unit)&&String(r[6])===String(item.currency)&&typeof r[3]==='number'&&Number.isFinite(r[3])&&r[3]>=0&&typeof r[4]==='number'&&Number.isFinite(r[4])&&r[4]>=0&&r[4]<=100&&validDate(r)>=today);if(hits.length!==1)return{index,matched:false,reason:hits.length?'Multiple current prices: review required':'No exact, current specification/unit/currency match'};return{index,matched:true,price:hits[0][3],tax:hits[0][4],validUntil:validDate(hits[0])};})};
}
