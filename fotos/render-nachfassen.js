const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/foto-nachfassen.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(1200);
  console.log('Inter800:',await p.evaluate(()=>document.fonts.check('800 99px Inter')));
  console.log('Inter500:',await p.evaluate(()=>document.fonts.check('500 27px Inter')));
  const w=await p.evaluate(()=>[...document.querySelectorAll('.hd,.kicker,.p1,.p2,.src')].map(x=>x.className.split(' ')[0]+':'+Math.round(x.getBoundingClientRect().right)));
  console.log('rechte Kante (max 1080):',w.join(' '));
  await (await p.$('.s')).screenshot({path:__dirname+'/foto-nachfassen.png'});
  await b.close(); console.log('ok');
})();
