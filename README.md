# gulp-mobile-splashscreens
Gulp plugin that creates PNG splashscreens for iOS and Android based on a SVG image

## Usage

To use the the plugin in your gulp process:

```javascript
const gulp = require('gulp');
const mobileSplashscreens = require('gulp-mobile-splashscreens');

gulp.task('default', [], function() {
    gulp.src('splashscreen.svg')
        .pipe(mobileSplashscreens())
        .pipe(gulp.dest('images'));
});
```

This will create all splashscreens in the folder `images/`.


### Cordova / PhoneGap

Add the following to your `config.xml` to use the icons in a Cordova/PhoneGap application:

```html
<platform name="ios">
    <!-- Splashscreens -->
    <splash src="images/ios-1080-portrait.png"       width="1080" height="1920"/>
    <splash src="images/ios-1080-landscape.png"      width="1920" height="1080"/>
    <splash src="images/ios-750-portrait.png"        width="750"  height="1334"/>
    <splash src="images/ios-750-landscape.png"       width="1334" height="750"/>
    <splash src="images/ios-1242-portrait.png"       width="1242" height="2208"/>
    <splash src="images/ios-1242-landscape.png"      width="2208" height="1242"/>
    <splash src="images/ios-640-portrait.png"        width="640"  height="1136"/>
    <splash src="images/ios-640-landscape.png"       width="1136" height="640"/>
    <splash src="images/ios-640-short-portrait.png"  width="640"  height="960"/>
    <splash src="images/ios-640-short-landscape.png" width="960"  height="640"/>
    <splash src="images/ios-320-portrait.png"        width="320"  height="480"/>
    <splash src="images/ios-320-landscape.png"       width="480"  height="320"/>
    <splash src="images/ios-2048-portrait.png"       width="2048" height="2732"/>
    <splash src="images/ios-2048-landscape.png"      width="2732" height="2048"/>
    <splash src="images/ios-1536-portrait.png"       width="1536" height="2048"/>
    <splash src="images/ios-1536-landscape.png"      width="2048" height="1536"/>
    <splash src="images/ios-768-portrait.png"        width="768"  height="1024"/>
    <splash src="images/ios-768-landscape.png"       width="1024" height="768"/>
</platform>
```

## Credits

Sample icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](http://www.flaticon.com) is licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/)
