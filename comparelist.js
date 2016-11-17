// terminal: node comparelist.js

	var clc = require("colors");
	var imageDiff = require('image-diff');
	var fs = require('fs');
	var dir = 'screens';
	
	console.log("\n\nGoing to read directory /".yellow.bold+dir.yellow);
	
	fs.readdir(""+dir+"/",function(err, files){
	var dirlist = new Array();
	
	if (err) {
		return console.error(err);
	}

	files.forEach( function (file){
		if( fs.lstatSync(dir+"/"+file).isDirectory() ) {
			dirlist.unshift(file);
		}
	});


	if(dirlist[1]===undefined) {
		// mssing 2nd path
		console.log(colors.error("Two versions are needed to compare it"));

	} else {
		console.log('compare '+dirlist[0].green+' and '+dirlist[1].green);
		console.log('________________________________');
		var ddd = file2array(dir+'/'+dirlist[0]);

		var dd = file2array(dir+'/'+dirlist[1]);
		var fileName;
		ddd.forEach(function(fileName) {
			if(dd.indexOf(fileName)>-1){

				imageDiff({
					actualImage: 'screens/'+dirlist[0]+'/'+fileName,
					expectedImage: 'screens/'+dirlist[1]+'/'+fileName,
					diffImage: 'compared/'+dirlist[1]+'--'+dirlist[1]+'/'+fileName,
				}, function (err, imagesAreSame) {
					if(imagesAreSame) console.log('compare & are the same '+fileName.yellow);
					else console.log('compare '+fileName.green);
					// error will be any errors that occurred
					// imagesAreSame is a boolean whether the images were the same or not
					// diffImage will have an image which highlights differences
				});

			} else console.log('not found '+getLastDirName(fileName).red);
		})
		console.log('________________________________');
		testit (dirlist);

	} // end


	});

/* helpers
*/
	function getFileName (name) {
		if(name.indexOf('/')>-1) {
			name = name.substr(name.lastIndexOf('/')+1);
		}
		return name;
	}

	function getLastDirName (name) {
		if(name.indexOf('/')>-1) {
			name = name.substr(0,name.lastIndexOf('/'));
			name = name.substr(name.lastIndexOf('/')+1);
		}
		return name;
	}
	
	function file2array(dir) {
		var results = [];
		var list = fs.readdirSync(dir);
		list.forEach(function(file) {
			file = dir + '/' + file;
			var stat = fs.statSync(file);
			if (stat && stat.isDirectory()) results = results.concat(walk(file));
			else results.push(getFileName(file));
		})
		return results;
	}

	function testit (dirlist) {
			console.log('Successfully compared: '+dirlist[0].green+' with '+dirlist[1].green);
	}
