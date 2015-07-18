var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req,res,next){
	superagent.get("https://cnodejs.org/").
		end(function(err, sres){
			if(err){
				return next(err);
			}
		    var $ = cheerio.load(sres.text);
			var items = [];
			$('#topic_list .cell').each(function(idx, element){
				var $element = $(element).find('.topic_title');
				var $author = $(element).find('.user_avatar').attr('href').split("/")[2];
				
				items.push({
					title:$element.attr('title'),
					href:$element.attr('href'),
					author:$author
				});
			});
			console.log(items);
			res.send(items);
	});
});

app.listen(3000, function(req, res){
	console.log("app is working");
});