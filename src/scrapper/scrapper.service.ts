import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  private numberOfPages: number = 0;

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
      this.numberOfPages = Number(document.querySelector('.pagination_label--max').innerHTML.split('/')[1]);

      document.querySelectorAll('.results__list-container-item').forEach(
        item => {
          console.log(item.querySelector('.offer-details__title-link').innerHTML);
        }
      )

    })
    // await browser.close();
    return 'ok'
  }
};
