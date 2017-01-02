/* jshint node: true */

'use strict';

const mobileIconsPlugin = require('../');
const fs = require('fs');
const should = require('should');
const File = require('vinyl');

describe('gulp-mobile-splashscreens', function() {
	// svg2png takes its time
	this.timeout(15000);

	let file, check;

	beforeEach(function() {
		file = new File({
			path: 'test/fixtures/reindeer.svg',
			contents: fs.readFileSync('test/fixtures/reindeer.svg')
		});

		// Collects all created files
		check = function(stream, done, cb) {
			const files = {};
			stream.on('data', function(newFile) {
				files[newFile.path] = newFile;
			});
			stream.on('end', function(newFile) {
				cb(files);
				done();
			});

			stream.write(file);
			stream.end();
		};
	});

	it('should create all files', function(done) {
		const sizes = {
			'small' : { width: 36, height: 36 },
			'big' : { width: 48, height: 48 }
		};

		const stream = mobileIconsPlugin(sizes, () => Promise.resolve(null));

		check(stream, done, function(files) {
			files.should.have.keys('small.png', 'big.png');
		});
	});

	it('should add content into PNG files', function(done) {
		const stream = mobileIconsPlugin({
			'small' : { width: 36, height: 36 },
		});

		check(stream, done, function(files) {
			const ldpiFile = files['small.png'];
			String(ldpiFile.contents).should.equal(fs.readFileSync('test/expected/small.png', 'utf-8'));
		});
	});
});
