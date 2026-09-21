const {chromium}=require('playwright');
const jobs=[['fmt-notiz-quadrat',1080,1080],['fmt-notiz-quer',1200,627],
            ['fmt-offerte-quadrat',1080,1080],['fmt-offerte-quer',1200,627],
            ['fmt-krank-quadrat',1080,1080],['fmt-krank-quer',1200,627]];
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  for(const [name,w,h] of jobs){
    const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});
    await p.goto('file://'+__dirname+'/'+name+'.html',{waitUntil:'networkidle'});
    await p.evaluate(()=>document.fonts.ready);
    await p.waitForTimeout(700);
    const o=await p.evaluate(()=>{
      const s=document.querySelector('.s').getBoundingClientRect();
      const t=document.querySelector('.txt');
      return {ueberlauf: t? Math.round(t.getBoundingClientRect().bottom-s.bottom) : null};
    });
    console.log(name,w+'x'+h, o.ueberlauf===null?'':(o.ueberlauf>0?`TEXT RAGT ${o.ueberlauf}px RAUS`:'Text passt'));
    await (await p.$('.s')).screenshot({path:__dirname+'/'+name+'.png'});
    await p.close();
  }
  await b.close(); console.log('ok');
})();
