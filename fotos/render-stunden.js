const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-stunden.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>{
    const t=document.querySelector('.tbl').getBoundingClientRect();
    const f=document.querySelector('.foot').getBoundingClientRect();
    return {kringel:!!window.__ok, zeilen:document.querySelectorAll('.r').length,
            luft:Math.round(f.top-t.bottom)};
  });
  console.log('Kringel:',o.kringel,'| Zeilen:',o.zeilen,'| Luft Tabelle zu Fuss:',o.luft+'px');
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-stunden.png'});
  await b.close(); console.log('ok');
})();
