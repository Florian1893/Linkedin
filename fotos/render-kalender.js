const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-kalender.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>{
    const s=document.querySelector('.s').getBoundingClientRect();
    const f=document.querySelector('.foot').getBoundingClientRect();
    const last=[...document.querySelectorAll('.wk')].pop().getBoundingClientRect();
    const labs=[...document.querySelectorAll('.lab')].map(e=>{const r=e.getBoundingClientRect();
      return (r.left<4||r.right>1076)?'RAGT RAUS: '+e.textContent:null;}).filter(Boolean);
    return {kringel:!!window.__ok, luft:Math.round(f.top-last.bottom), labels:labs};
  });
  console.log('Kringel gezeichnet:',o.kringel,'| Luft zwischen Kalender und Fuss:',o.luft+'px');
  console.log('Beschriftungen:',o.labels.length?o.labels.join(' | '):'alle im Rahmen');
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-kalender.png'});
  await b.close(); console.log('ok');
})();
