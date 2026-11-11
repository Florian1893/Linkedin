const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const p=await b.newPage();
  await p.goto('file://'+__dirname+'/leitfaden-system.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  const over=await p.evaluate(()=>Array.from(document.querySelectorAll('.seite')).map((s,i)=>{const f=s.querySelector('.fuss');const kids=Array.from(s.children).filter(c=>!c.classList.contains('fuss')&&!c.classList.contains('autor'));const last=kids[kids.length-1];if(!last)return null;const lb=last.getBoundingClientRect().bottom-s.getBoundingClientRect().top;return {seite:i+1,inhaltUnten:Math.round(lb),fussOben:f?Math.round(f.getBoundingClientRect().top-s.getBoundingClientRect().top):null};}));
  console.log(JSON.stringify(over));
  await p.pdf({path:__dirname+'/Leitfaden-Ein-Ort-fuer-den-ganzen-Betrieb.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});
  await b.close();console.log('ok');
})();
