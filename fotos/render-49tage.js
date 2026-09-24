const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-49tage.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>{
    const s=document.querySelector('.s').getBoundingClientRect();
    const sub=document.querySelector('.sub').getBoundingClientRect();
    const f=document.querySelector('.foot').getBoundingClientRect();
    const big=document.querySelector('.big').getBoundingClientRect();
    return {strich:!!window.__ok, luft:Math.round(f.top-sub.bottom),
            zahlBreite:Math.round(big.width), rand:Math.round(1080-big.right)};
  });
  console.log('Strich:',o.strich,'| Luft Text zu Fuss:',o.luft+'px',
              '| Zahlenzeile breit:',o.zahlBreite+'px, rechter Rand:',o.rand+'px');
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-49tage.png'});
  await b.close(); console.log('ok');
})();
