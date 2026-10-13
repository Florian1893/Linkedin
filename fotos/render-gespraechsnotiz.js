const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-gespraechsnotiz.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>({rot:window.__ok, handschrift:document.fonts.check('700 40px Caveat')}));
  console.log('Rotstift:',JSON.stringify(o.rot),'| Caveat geladen:',o.handschrift);
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-gespraechsnotiz.png'});
  await b.close(); console.log('ok');
})();
