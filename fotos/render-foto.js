const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/foto-frage.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(1500);
  console.log('Inter:',await p.evaluate(()=>document.fonts.check('500 74px Inter')));
  await (await p.$('.s')).screenshot({path:'foto-frage-01.png'});
  await b.close(); console.log('ok');
})();
