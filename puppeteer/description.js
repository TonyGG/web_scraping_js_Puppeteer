const puppeteer = require("puppeteer")
const fs = require("fs/promises")


async function start() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage()
//   //////////////////////////////////////////////
//   NOTE: THIS ONLY WORKS FOR STATIC WEBSITES
//   //////////////////////////////////////////////
  await page.goto('https://blog.hubspot.com/sales/crm-database?hubs_content=blog.hubspot.com%252Fsales%252Fultimate-guide-creating-sales-plan&hubs_content-cta=blog-nav-card--media-card&hubs_post-cta=blognavcard-sales');

const text = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".mt-2")).map(x => x.textContent)
  })
  await fs.writeFile("description.txt", text.join("\r\n"))

  await browser.close()
}
start()



