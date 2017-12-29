'use strict'
const fetch = require('axios').get;

const URL = 'http://nomesportugueses.blogspot.com.br/2009/04/nomes-femininos-de-a-z.html';


class Crawler {
  constructor(url,query) {
    this.query=query || '/w';
    this.fetchPage(url)
    .then(htmlPage => this.filterHtmlPage(htmlPage));
  }
  fetchPage(url){
    return new Promise(function(resolve, reject) {
      fetch(url).then(htmlPage => resolve(htmlPage));
    });
  }
  filterHtmlPage(htmlPage){
    // console.log(typeof(htmlPage));
      let results = htmlPage[0];
      console.log(results);
  }
}
new Crawler(URL);
