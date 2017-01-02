/* jshint node: true */

'use strict';

const through = require('through2');
const svg2png = require('svg2png');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-mobile-splashscreens';

/**
 * List of all sizes for which PNGs need to be created
 */
const SIZES = {
	// References:
	// - https://developer.apple.com/ios/human-interface-guidelines/graphics/launch-screen/ (canonical source, but usually only for the most recent iOS version)
	// iPhone 6s Plus, iPhone 6 Plus
	'ios-1080-portrait'  : { width: 1080, height: 1920 },
	'ios-1080-landscape' : { width: 1920, height: 1080 },

	// iPhone 6s, iPhone 6
	'ios-750-portrait'   : { width:  750, height: 1334 },
	'ios-750-landscape'  : { width: 1334, height:  750 },

	// iPhone SE
	'ios-640-portrait'   : { width:  640, height: 1136 },
	'ios-640-landscape'  : { width: 1136, height:  640 },

	// 12.9-inch iPad Pro
	'ios-2048-portrait'  : { width: 2048, height: 2732 },
	'ios-2048-landscape' : { width: 2732, height: 2048 },

	// 9.7-inch iPad Pro, iPad Air 2, iPad mini 4, iPad mini 2
	'ios-1536-portrait'  : { width: 1536, height: 2048 },
	'ios-1536-landscape' : { width: 2048, height: 1536 },
};

const transform = (sizes, imageTransform) => function(file, encoding, callback) {
	if (file.isStream()) {
		this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
		return callback();
	}

	const promises = Object.keys(sizes).map(name => {
		return imageTransform(new Buffer(file.contents), sizes[name])
			.then(png => {
				const result = new gutil.File({
					cwd : './',
					path : `${name}.png`,
					contents: png
				});
				this.push(result);

				return png;
			});
	});

	Promise
		.all(promises)
		.then(()  => callback(null))
		.catch(e => console.error(e));
};

/**
 * Creates mobile icons
 * @param  {Object} [sizes=SIZES]            For testing: reduce number of sizes
 * @param  {Function} [imageTransform=svg2png] For testing: avoid expensive calls to svg2png
 * @return {Stream}
 */
module.exports = function(sizes = SIZES, imageTransform = svg2png) {
	return through.obj(transform(sizes, imageTransform));
};
