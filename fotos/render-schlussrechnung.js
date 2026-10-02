const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-schlussrechnung.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>{
    const n=document.getElementById('n3').getBoundingClientRect();
    const c=document.fonts.check('700 40px Caveat');
    return {rot:!!window.__ok, handschrift:c, notiz_unten:Math.round(n.bottom)};
  });
  console.log('Rotstift:',o.rot,'| Caveat geladen:',o.handschrift,'| Notiz endet bei:',o.notiz_unten+'px von 1350');
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-schlussrechnung.png'});
  await b.close(); console.log('ok');
})();
