const puppeteer = require('puppeteer')
 
async function getPDF() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('https://finance.yahoo.com/news/robinhood-says-sec-issued-subpoena-233704086.html');
 await page.emulateMediaType('screen');
   
const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });
  await browser.close();
 }

getPDF()