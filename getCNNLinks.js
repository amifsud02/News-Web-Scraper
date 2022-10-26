const puppeteer = require('puppeteer');
const fs = require('fs');

async function start() {
    const URL = 'https://edition.cnn.com/'

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(URL, {
        waitUntil: 'networkidle2'
    });

    const getLinks = await page.evaluate(() => {
        const links = document.querySelectorAll('#footer-nav-container div div div nav ul li a');
        
        linkList = []

        for(i = 0; i <= 94; i++)
        {
            linkDict = {'name': links[i].innerText, 'href': links[i].href};
            linkList.push(linkDict);
        }

        return linkList;
    });

    jsonFile = JSON.stringify(getLinks);

    fs.appendFile('./output/cnnLink.json', jsonFile, (err) => {
        if(err) throw err;
        console.log("Links appended");
    })

    await browser.close();
}

start();