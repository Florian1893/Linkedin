const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/bild-chatliste.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(900);
  const o=await p.evaluate(()=>{
    const s=document.querySelector('.s').getBoundingClientRect();
    const rs=[...document.querySelectorAll('.row')];
    return {mark:window.__mk, zeilen:rs.length,
      letzteZeileUnten:Math.round(rs[rs.length-1].getBoundingClientRect().bottom),
      rahmen:Math.round(s.height)};
  });
  console.log('Kringel:',JSON.stringify(o.mark),'| Zeilen:',o.zeilen);
  console.log('Letzte Zeile endet:',o.letzteZeileUnten,'von',o.rahmen,
    o.letzteZeileUnten>o.rahmen?'-> ABGESCHNITTEN':'-> passt');
  await (await p.$('.s')).screenshot({path:__dirname+'/bild-chatliste.png'});
  await b.close(); console.log('ok');
})();
