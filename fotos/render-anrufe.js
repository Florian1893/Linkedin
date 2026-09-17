const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-anrufe.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(1200);
  console.log('Inter800:',await p.evaluate(()=>document.fonts.check('800 52px Inter')));
  const o=await p.evaluate(()=>{
    const s=document.querySelector('.s').getBoundingClientRect();
    const f=document.querySelector('.foot').getBoundingClientRect();
    const st=document.querySelector('.stack').getBoundingClientRect();
    return {stackBottom:Math.round(st.bottom),footTop:Math.round(f.top),luft:Math.round(f.top-st.bottom),hoehe:Math.round(s.height)};
  });
  console.log('Stack endet:',o.stackBottom,'| Fussblock beginnt:',o.footTop,'| Luft:',o.luft,'px');
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-anrufe.png'});
  await b.close(); console.log('ok');
})();
