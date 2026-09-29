const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-architekt.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>{
    const c=document.getElementById('chat').getBoundingClientRect();
    const l=document.getElementById('last').getBoundingClientRect();
    return {strich:document.getElementById('mk').innerHTML.length>0,
            blasen:document.querySelectorAll('.b').length,
            tage:document.querySelectorAll('.chip').length,
            ueberlauf:Math.round(l.bottom-c.bottom)};
  });
  console.log('Strich:',o.strich,'| Blasen:',o.blasen,'| Tage:',o.tage,'| Ueberlauf letzte Blase:',o.ueberlauf+'px');
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-architekt.png'});
  await b.close(); console.log('ok');
})();
