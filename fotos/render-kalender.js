const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-kalender.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>{
    const g=document.querySelector('.leg').getBoundingClientRect();
    const f=document.querySelector('.foot').getBoundingClientRect();
    return {kringel:!!window.__ok, zellen:document.querySelectorAll('.c').length,
            rot:document.querySelectorAll('.c.rot').length, amb:document.querySelectorAll('.c.amb').length,
            luft:Math.round(f.top-g.bottom)};
  });
  console.log('Kringel:',o.kringel,'| Zellen:',o.zellen,'| rot:',o.rot,'| amber:',o.amb,'| Luft Raster zu Fuss:',o.luft+'px');
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-kalender.png'});
  await b.close(); console.log('ok');
})();
