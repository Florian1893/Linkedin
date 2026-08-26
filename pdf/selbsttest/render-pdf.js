const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage();
  await p.goto('file://'+__dirname+'/selbsttest.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(2000);
  console.log('Inter geladen:',await p.evaluate(()=>document.fonts.check('500 34pt Inter')));
  const n=await p.evaluate(()=>document.querySelectorAll('.p').length);
  console.log('Seiten im HTML:',n);
  await p.pdf({path:'woran-dein-betrieb-haengt.pdf',format:'A4',printBackground:true,
    margin:{top:'0',bottom:'0',left:'0',right:'0'}});
  for(let i=0;i<n;i++){
    await (await p.$$('.p'))[i].screenshot({path:`p-${String(i+1).padStart(2,'0')}.png`});
  }
  await b.close(); console.log('ok');
})();
