import puppeteer from "puppeteer";

export const response = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: []
  });
  const page = await browser.newPage();
  await page.goto('https://www.mercadolibre.com.co/ofertas', { waitUntil: 'domcontentloaded' })
  console.log('opening connection..');

  const data = await page.evaluate(() => {
    let items = document.querySelectorAll("div.promotion-item__container");
    let results = []
    console.log('looking for data');
    items.forEach((item) => {
      let imageUrl = item.querySelector('img.promotion-item__img').getAttribute('src');
      let name = item.querySelector('p.promotion-item__title').innerText;
      let discount = item.querySelector('span.promotion-item__discount').innerText;
      let price = item.querySelector('span.promotion-item__price').children[0].innerText;
      results.push({
        url: imageUrl,
        name: name,
        price: price,
        discount: discount
      });
    });
    console.log('data found');
    return results;
  });
  await browser.close();
  return data;
};
