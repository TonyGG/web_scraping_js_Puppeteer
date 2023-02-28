const puppeteer = require("puppeteer")
const fs = require("fs/promises")
// if schedule with cron then below import is required
const cron = require('node-cron')

async function start() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage()
  await page.goto("https://finance.yahoo.com");

  await page.screenshot({path: 'screenshot.png', fullPage:true , waitUntil: "domcontentloaded"});
  await browser.close()
}

// run every 20000 milliseconds.--->20 seconds
setInterval(start,20000)
// if schedule with cron then below replace setInterval function with below function
// cron.schedule("*/5 * * * * *", start)
// start()

 
