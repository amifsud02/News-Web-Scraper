const puppeteer = require('puppeteer');
const fs = require('fs');

async function start(urlToFetch) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(urlToFetch, {
        waitUntil: 'networkidle2'
    });

    const getContent = await page.evaluate(() => {
        
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

    
    jsonFile = getContent;
    jsonFile['url'] = urlToFetch;
    jsonFile = JSON.stringify(jsonFile);

    fs.appendFile('./output/test.json', jsonFile, (err) => {
        if (err) throw err;
        console.log("The data was appended to the file")
    })

    //fs.writeFileSync('./output/test.json', jsonFile)

    await browser.close();
    
}

listOfUrls = [
    
]
start('https://edition.cnn.com/2022/10/08/europe/crimea-bridge-putin-ukraine-analysis-intl/index.html')
