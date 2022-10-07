const puppeteer = require('puppeteer');

const URL = "https://timesofmalta.com/"

describe('Times of Malta Puppeteer Testing', () => {
    it('should launch the browser', async function() {
        const browser = await puppeteer.launch({
            headless: false, 
            slowMo: 10,
            devtools: true
        });

        const page = await browser.newPage();
        await page.goto(URL);
        
        const grabArticles = await page.evaluate(() => {
            const articleTag = document.querySelectorAll('.hi-Highlights_sub .wi-WidgetSubCompType_2-info');
            
            let articles = [];

            articleTag.forEach((tag) => {
                articles.push(tag.innerText)
            })

            return articles
            
        })
        

        console.log(grabArticles)

        await browser.close();
    })
})