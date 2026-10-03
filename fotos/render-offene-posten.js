const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-offene-posten.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>{
    const pi=document.getElementById('postit').getBoundingClientRect();
    const t=document.querySelector('table').getBoundingClientRect();
    return {rot:window.__ok, handschrift:document.fonts.check('700 40px Caveat'),
      postit:[Math.round(pi.left),Math.round(pi.top),Math.round(pi.right),Math.round(pi.bottom)],
      tabelle_rechts:Math.round(t.right)};
  });
  console.log('Rotstift:',JSON.stringify(o.rot),'| Caveat geladen:',o.handschrift,'| Post-it:',o.postit.join(','),'| Tabelle rechts:',o.tabelle_rechts);
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-offene-posten.png'});
  await b.close(); console.log('ok');
})();
