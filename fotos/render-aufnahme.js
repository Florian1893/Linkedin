const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-aufnahme.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>{
    const l=document.getElementById('leer').getBoundingClientRect();
    return {rot:window.__ok, handschrift:document.fonts.check('700 40px Caveat'), leer_unten:Math.round(l.bottom)};
  });
  console.log('Rotstift:',JSON.stringify(o.rot),'| Caveat geladen:',o.handschrift,'| Leeres Feld endet bei:',o.leer_unten+'px von 1350');
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-aufnahme.png'});
  await b.close(); console.log('ok');
})();
