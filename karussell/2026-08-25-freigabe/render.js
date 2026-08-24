const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/karussell.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(2000);
  const ready=await p.evaluate(()=>window.__ready);
  console.log('rough:',ready.rough);
  console.log('svg-children pro Slide:',ready.svgs.join(', '));
  if(ready.rough!=='object') throw new Error('rough.js nicht geladen');
  if(ready.svgs.some(n=>n===0)) throw new Error('leere SVG gefunden');
  const font=await p.evaluate(()=>document.fonts.check('700 100px Caveat'));
  console.log('Caveat geladen:',font);
  const slides=await p.$$('.slide');
  for(let i=0;i<slides.length;i++){
    await slides[i].screenshot({path:`seite-${String(i+1).padStart(2,'0')}.png`});
  }
  await p.pdf({path:'karussell-freigabe.pdf',width:'1080px',height:'1350px',
    printBackground:true,pageRanges:`1-${slides.length}`});
  await b.close();
  console.log('fertig:',slides.length,'Seiten');
})();
