const assert=require('node:assert/strict');
const {jsPDF}=require('../brochure/vendor/jspdf.umd.min.js');
const build=require('../brochure/pdf.js');
(async()=>{
 const d={reference:'RATAN-TEST-001',revision:'01',customer:'DEMO ONLY',title:'Material alternatives',brief:'Test brief',terms:'Review physical samples.',validUntil:'2026-10-01',currency:'INR',options:[{name:'Test laminate',spec:'Test specification',quantity:10,unit:'sheets',price:100,tax:18,shipping:50,eta:'To confirm',image:''}]};
 const pdf=await build(d,jsPDF,async()=>null);
 assert.equal(pdf.getNumberOfPages(),4);
 assert(pdf.output().startsWith('%PDF-'));
 assert(pdf.output('arraybuffer').byteLength>1000);
 const long=await build({...d,brief:'Specification and sample review. '.repeat(200)},jsPDF,async()=>null);
 assert(long.getNumberOfPages()>4);
 await assert.rejects(()=>build({...d,customer:'ગુજરાતી'},jsPDF,async()=>null),/English/);
 console.log('PASS: PDF binary, page count, long-copy pagination and explicit unsupported-script error');
})();
