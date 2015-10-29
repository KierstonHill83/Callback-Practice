var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

// router.get('/', function(req, res, next) {
//   request
//     .get('https://www.reddit.com/r/Web_Development/')
//     .on('response', function(response) {
//       console.log(response.statusCode);
//       res.send(response.headers['content-type']);
//       console.log(response);
//   });
// });



// router.get('/', function(req, res, next) {
//   request('https://news.ycombinator.com/', function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       // console.log(body);
//       var $ = cheerio.load(body);
//       $('span.comhead').each(function(i, element) {
//         var a = $(this).prev();
//         var title = a.text();
//         var url = a.attr('href');

//         var scrapedData = {
//           title: title,
//           url: url
//         };
//         res.json(scrapedData);
//         console.log(scrapedData);
//       });
//     }
//   });
// });



// router.get('/', function(req, res, next) {
//   request('https://www.reddit.com/r/Web_Development/', function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       // console.log(body);
//       var $ = cheerio.load(body);
//       $('span.domain').each(function(i, element) {
//         var a = $(this).prev();
//         var title = a.text();
//         var url = a.attr('href');

//         var scrapedData = {
//           title: title,
//           url: url
//         };
//         res.json(scrapedData);
//         console.log(scrapedData);
//       });
//     }
//   });
// });


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