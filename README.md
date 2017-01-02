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

## Credits

Sample icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](http://www.flaticon.com) is licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/)
