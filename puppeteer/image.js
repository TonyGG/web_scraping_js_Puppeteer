const puppeteer = require("puppeteer")
const fs = require("fs/promises")


async function start() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage()
////////////////////////////////////////////////
// Next: save image to specific folder///////
///////////////////////////////////////////////
  await page.goto('https://finance.yahoo.com/news/robinhood-says-sec-issued-subpoena-233704086.html');

   const photos = await page.$$eval("img", imgs => {
     return imgs.map(x => x.src)
   })
   for (const photo of photos) {
       const imagepage = await page.goto(photo)
       const img_name = photo.split("/").pop()
       await fs.writeFile(img_name, await imagepage.buffer())
    //    console.log(img_name)
   }

  await browser.close()
}

start()