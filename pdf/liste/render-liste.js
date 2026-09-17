const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage();
  await p.goto('file://'+__dirname+'/liste.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(1200);
  const o=await p.evaluate(()=>{
    const ps=[...document.querySelectorAll('.p')];
    return {font:document.fonts.check('500 24pt Inter'),
      seiten:ps.length,
      ueberlauf:ps.map((e,i)=>e.scrollHeight>e.clientHeight+2?`Seite ${i+1}: ${e.scrollHeight-e.clientHeight}px zu viel`:null).filter(Boolean)};
  });
  console.log('Inter:',o.font,'| Seiten:',o.seiten);
  console.log('Ueberlauf:',o.ueberlauf.length?o.ueberlauf.join(' | '):'keiner');
  await p.pdf({path:__dirname+'/was-ohne-dich-rausgehen-darf.pdf',format:'A4',printBackground:true,
    margin:{top:'0',bottom:'0',left:'0',right:'0'}});
  for(let i=0;i<o.seiten;i++){
    await (await p.$$('.p'))[i].screenshot({path:`${__dirname}/s-${String(i+1).padStart(2,'0')}.png`});
  }
  await b.close(); console.log('ok');
})();
