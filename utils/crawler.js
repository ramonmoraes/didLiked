'use strict'
const fetch = require('axios').get;
const jsdom = require('jsdom');
const fs = require('fs');
const {JSDOM} = jsdom;

const URL = 'http://nomesportugueses.blogspot.com.br/2009/04/nomes-femininos-de-a-z.html';

class Crawler {
  constructor(url,query) {
    this.query=query || '/w';
    this.fetchPage(url)
    .then(htmlPage => this.transformInJSDOM(htmlPage));
  }
  fetchPage (url){
    return new Promise(function(resolve, reject) {
      fetch(url).then(htmlPage => resolve(htmlPage));
    });
  }
  transformInJSDOM (htmlPage) {
    let pageData = htmlPage.data;
    let jsdomPage = new JSDOM(pageData);
    this.getListOfNames(jsdomPage);
  }
  getListOfNames (htmlPage) {
    const serializePage = htmlPage.serialize();
    const dirtyList = serializePage.match(/(?=<li>)(?!=<a>)(.*)(?!\/=li>)/gi);
    const listWithOutAnchorAndDivTags = this.removeAnchorAndDivFromList(dirtyList);
    const listWithOutLiTags = this.removeLiTags(listWithOutAnchorAndDivTags);
    const listWithNoEmptyValue = this.removeEmptyValue(listWithOutLiTags);
    const cleanedUpList = this.cleanUpList(listWithNoEmptyValue);
    this.writeListOfNames(cleanedUpList);
  }
  removeAnchorAndDivFromList (listOfNames) {
    const listWithoutAnchor = listOfNames.filter(name => (!name.match(/<a/g)));
    const listWithoutAnchorAndDivs = listWithoutAnchor.filter(name => (!name.match(/<div/g)));
    return listWithoutAnchorAndDivs;
  }
  removeLiTags (listOfNames) {
    const newList = listOfNames.map((name) => {
      name = name.replace(/<li>/,'');
      name = name.replace(/<\/li>/,'');
      return name;
    });
    return newList;
  }
  cleanUpList (listOfNames) {
    const newList = listOfNames.map((name) => {
      name = name.replace(/&nbsp/,'');
      name = name.replace(/;/,'');
      return name;
    });
    return newList;
  }
  removeEmptyValue (listOfNames) {
    let newList = listOfNames.filter(name => name!=='');
    return newList;
  }
  writeListOfNames (listOfNames) {
    console.log(listOfNames);
    fs.writeFile('./utils/pageFile.txt',listOfNames,(err) => {
      if(err)
        throw err;
      console.log('file has been saved');
    });
  }
}
new Crawler(URL);
