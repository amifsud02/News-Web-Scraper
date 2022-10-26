const puppeteer = require('puppeteer');

const URL = 'https://edition.cnn.com/2022/10/08/europe/crimea-bridge-putin-ukraine-analysis-intl/index.html'

describe('CNN Puppeteer Testing', () => {
    it('should launch the browser', async function() {
        const browser = await puppeteer.launch({
            headless: false, 
            slowMo: 10,
            devtools: true
        });

        const page = await browser.newPage();
        await page.goto(URL);
        
        const grabArticles = await page.evaluate(() => {
            const headline = document.querySelector('.headline__text');
            const paragraphs = document.querySelectorAll('.paragraph');
    
            let content = [];
    
            paragraphs.forEach((paragraph) => {
                content.push(paragraph.innerText)
            })
    
            data = {
                headline: headline.innerText, 
                paragraphs: content,
            }
            
            return data;
        })
        

        console.log(grabArticles, URL)

        await browser.close();
    })
})