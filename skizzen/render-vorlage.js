const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
  await p.goto('file://'+__dirname+'/vorlage.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(2000);
  const rd=await p.evaluate(()=>window.__ready);
  console.log('rough:',rd.rough,'| svg-children:',rd.n);
  if(rd.rough!=='object'||rd.n===0) throw new Error('Rendering leer');
  console.log('Caveat:',await p.evaluate(()=>document.fonts.check('700 96px Caveat')));
  await (await p.$('.s')).screenshot({path:'vorlage-frage-01.png'});
  await b.close(); console.log('ok');
})();
