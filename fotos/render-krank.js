const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-krank.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>({
    font:document.fonts.check('800 35px Inter'),
    mark:window.__mk,
    strichGezeichnet:document.querySelectorAll('#mk path').length,
    blasen:document.querySelectorAll('.b').length,
    chatUnten:Math.round(document.querySelector('#last').getBoundingClientRect().bottom),
    inputOben:Math.round(document.querySelector('.inp').getBoundingClientRect().top)
  }));
  console.log('Inter:',o.font,'| Blasen:',o.blasen);
  console.log('Roter Strich:',JSON.stringify(o.mark));
  console.log('Letzte Blase endet:',o.chatUnten,'| Eingabefeld beginnt:',o.inputOben,'| Luft:',o.inputOben-o.chatUnten);
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-krank.png'});
  await b.close(); console.log('ok');
})();
