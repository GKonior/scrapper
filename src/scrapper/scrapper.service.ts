import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  async getDataViaPuppeteer() {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const pageNumber = 1;
    const URL = `https://www.pracuj.pl/praca?pn=${pageNumber}`
    const page = await browser.newPage();
    await page.goto(URL, {
      waitUntil: 'networkidle2'
    });

    await page.evaluate(() => {
      const offers = [];
      const numberOfPages = Number(document.querySelector('.pagination_label--max').innerHTML.split('/')[1]);
      const pageItems = document.querySelectorAll('.results__list-container-item');

      pageItems.forEach(
        item => {
          const offerLink = item.querySelector('.offer-details__title-link');
          if(offerLink){
           offers.push({ title: offerLink.innerHTML , slug: offerLink.getAttribute('href') });
          }
        }
      )

      console.log('number of pages', numberOfPages);
      console.log('offers', offers);
    })
    // await browser.close();
    return 'ok'
  }
};
