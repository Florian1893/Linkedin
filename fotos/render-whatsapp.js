const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-whatsapp.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(1200);
  console.log('Inter800:',await p.evaluate(()=>document.fonts.check('800 52px Inter')));
  const o=await p.evaluate(()=>{
    const ov=[...document.querySelectorAll('.tx')].map(e=>{const t=e.getBoundingClientRect(),m=e.parentElement.querySelector('.tm').getBoundingClientRect();return t.right>m.left?'KOLLISION':'ok';});
    return {text_gegen_zeit:ov.join(','),blasen:document.querySelectorAll('.b').length,
            chatHoehe:Math.round(document.querySelector('.chat').getBoundingClientRect().height)};
  });
  console.log('Text gegen Zeitstempel:',o.text_gegen_zeit,'| Blasen:',o.blasen,'| Chatflaeche:',o.chatHoehe+'px');
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-whatsapp.png'});
  await b.close(); console.log('ok');
})();
