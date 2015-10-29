var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

// my first attempt


// router.get('/', function(req, res, next) {
//   getData('https://news.ycombinator.com/', 'span.comhead');
//   getData('https://www.reddit.com/r/Web_Development/', 'span.domain');
// });


// function getData(url, className) {
//   var scrapedData = [];
//   request(url, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var $ = cheerio.load(body);
//       $(className).each(function(i, element) {
//         var a = $(this).prev();
//         var title = a.text();
//         var url = a.attr('href');

//         scrapedData.push({
//           title: title, 
//           url: url
//           });
         
//       });
//       console.log('title ' +scrapedData.title);
//       // var stringTitle = scrapedData.title.match(/javascript/g);
        
//       // if (stringTitle) {
//       //   res.send(scrapedData);
//       //   console.log(scrapedData);
//       //   console.log(scrapedData[0]);
//       // }
//       // res.send(scrapedData[0]);
//       console.log(scrapedData[0]);
//     }
//   });
// }


router.get('/', function(req, res, next) {

  // ajax request hackernews
  var newsUrl = 'https://news.ycombinator.com';
  var newsHtml = request(newsUrl, function(err, response, html) {

    // parse html
    var $ = cheerio.load(html);
    var newsTitle = $('td.title a').first().text();

    // is javascript in the title
    var newsHasJavascript = newsTitle.match('javascript');

    if (!newsHasJavascript) {
      // request python.org, return something fun
      var pythonUrl = 'https://python.org';
      var pythonHtml = request(pythonUrl, function(err, response, html) {

        // parse html
        var $ = cheerio.load(html);
        var pythonLogo = $('img').attr('src');
        res.send('<img src="https://python.org/'+pythonLogo+'">');
      });
    } else {
      // ajax request reddit
      var redditUrl = 'https://www.reddit.com/r/Web_Development/';
      var redditHtml = request(redditUrl, function(err, response, html) {

        // parse html
        var $ = cheerio.load(html);
        var redditTitle = $('a.title').first().text();

        // is javascript in the title
        var redditHasJavascript = redditTitle.match('javascript');
        
        if (!redditHasJavascript) {
          // request python.org, return something fun
          var pythonUrl = 'https://python.org';
          var pythonHtml = request(pythonUrl, function(err, response, html) {

            // parse html
            var $ = cheerio.load(html);
            var pythonLogo = $('img').attr('src');
            res.send('<img src="https://python.org/'+pythonLogo+'">');
          });
        } else {
          // ajax request mdn
          var mdnUrl = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';
          var mdnHtml = request(mdnUrl, function(err, response, html) {

            // parse html
            var $ = cheerio.load(html);
            var tab = $('#tabzilla');
            res.send(tab);
          });
        }
      });
    }
  });
});

  

module.exports = router;