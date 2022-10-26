const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});

    const page = await browser.newPage();

    await page.goto('https://edition.cnn.com/2022/10/08/europe/crimea-bridge-putin-ukraine-analysis-intl/index.html');

    const grabContent = await page.evaluate(() => {
        const paragraphs = document.querySelectorAll('.paragraph');

        let content = [];

        paragraphs.forEach((paragraph) => {
            content.push(paragraph.innerText);
        })

        return content;
    })

    console.log(grabContent);

    browser.close();
})();

