// terminal: phantomjs screen.js

var page = require('webpage').create();
var z = '1024';


var fs = require('fs');

var d = fs.read('urls.txt');
		d = d.trim();
var urlbase = d.split("\n");

var urls = [];
var list = ['1400:1400', '1200:1200', '1024:768', '768:1024', '767:500', '480:480', '410:410', '375:667', '320:568'];

list.forEach(function(resolution) {
	urlbase.forEach(function(url) {
		urls.push(url+'||'+resolution);
	})
})

var today = new Date();
var folder = today.toISOString().split(':').join('_');

function nextPage(resolution) {
	if (urls.length < 1) {
		phantom.exit();
	}
	var loadStart = new Date(),
	url = urls.shift();
	if(url == '' || url == undefined) {
		phantom.exit();
	} else {
		var m = url.split('||');
		url = m[0];
		pos = m[1].split(':');
		if(pos[1]) {
			page.viewportSize = { width: pos[0], height: pos[1] };
		}
		/****
			access protected pahts 
			http://stackoverflow.com/questions/10114925/phantomjs-doesnt-send-authentication-header
			page.settings.userName = 'username';
			page.settings.password = 'password';
			page.customHeaders={'Authorization': 'Basic '+btoa('username:password')};
		*/
		console.log('url '+url+' width '+pos[1]);
		page.open(url, function (status) {
			if (status !== 'success') {
				console.log('Unable to load ' + url + ' : ' + status);
				nextPage();
			} else {
				console.log('Loaded', url, 'in', ((new Date() - loadStart) / 1000).toFixed(1), 'seconds');
				name = url.split(':').join('-').split('/').join('-')+'_'+pos[0]+'_'+pos[0]+'.png';

				setTimeout(function() {
					page.render('screens/'+folder+'/'+name);
					console.log('Written screens/'+folder+'/'+name);
					nextPage();
				}, 10000);
			}
		});
	}
}
nextPage();
