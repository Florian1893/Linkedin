const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-kuendigung.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>{
    const n=document.querySelector('.name').getBoundingClientRect();
    const f=document.getElementById('frist').getBoundingClientRect();
    return {kringel:!!window.__ok, unterschrift_unten:Math.round(n.bottom),
            frist_zeilen:Math.round(f.height)};
  });
  console.log('Kringel:',o.kringel,'| Name unten bei:',o.unterschrift_unten+'px von 1350','| Hoehe Frist-Span:',o.frist_zeilen+'px');
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-kuendigung.png'});
  await b.close(); console.log('ok');
})();
