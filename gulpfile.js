var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require("gulp-concat");

gulp.task('compatPolyfillTask', function () {
	return gulp.src([
		'./src/global.js',
		'./src/type.js',
		'./src/common.js',
		'./src/lang/number.js',
		'./src/lang/string.js',
		'./src/lang/function.js',
		'./src/lang/symbol.js',
		'./src/lang/object.ie.js',
		'./src/lang/object.modern.js',
		'./src/lang/Reflect.js',
		'./src/lang/Reflect.ie.js',
		'./src/lang/Array.ie.js',
		'./src/lang/Array.modern.js',
		'./src/lang/Date.js',
		'./src/lang/Date.ie.js',
		'./src/lang/Math.js',
		'./src/lang/Set.js',
		'./src/utils/utils-array.js',
		'./src/lang/Map.js',
		'./src/lang/JSON.js',
		'./src/lang/URLSearchParams.js',
		'./src/lang/URL.ie.js',
		'./src/utils/utils-nextTick.js',
		'./src/lang/Promise.js',
		'./src/lang/Proxy.js',
		'./src/lang/Proxy.ie.js',
		'./src/lang/Proxy.revocable.js',
		'./src/browser/DOMParser.js',
		'./src/browser/XMLHttpRequest.js',
		'./src/browser/location.js',
		'./src/browser/head.js',
		'./src/browser/Node.ie.js',
		'./src/utils/utils-cookie.js',
		'./src/browser/storage.ie.js',
		'./src/browser/currentScript.ie.js',
		'./src/browser/console.js',
		'./src/browser/Event.js',
	])
	.pipe(concat('polyfill.compat.js'))
	.pipe(gulp.dest('./'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/'));
});
gulp.task('modernPolyfillTask', function () {
	return gulp.src([
		'./src/global.js',
		'./src/type.js',
		'./src/common.js',
		'./src/lang/number.js',
		'./src/lang/string.js',
		'./src/lang/function.js',
		'./src/lang/symbol.js',
		'./src/lang/object.ff.js',
		'./src/lang/object.modern.js',
		'./src/lang/Reflect.js',
		'./src/lang/Reflect.ff.js',
		'./src/lang/Array.modern.js',
		'./src/lang/Iterator.js',
		'./src/lang/Date.js',
		'./src/lang/Date.ff.js',
		'./src/lang/Math.js',
		'./src/lang/Set.ff.js',
		'./src/lang/Set.js',
		'./src/utils/utils-array.js',
		'./src/lang/Map.ff.js',
		'./src/lang/Map.js',
		'./src/lang/JSON.js',
		'./src/lang/JSON.ff.js',
		'./src/lang/URLSearchParams.js',
		'./src/lang/URL.ff.js',
		'./src/utils/utils-nextTick.js',
		'./src/lang/Promise.js',
		'./src/lang/Proxy.js',
		'./src/lang/Proxy.revocable.js',
		'./src/browser/location.js',
		'./src/browser/head.js',
		'./src/browser/Node.ff.js',
		'./src/browser/currentScript.ff.js',
		'./src/browser/console.js',
		'./src/browser/Event.js',
	])
	.pipe(concat('polyfill.modern.js'))
	.pipe(gulp.dest('./'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/'));
});
gulp.task('polyfillTask', function () {
	return gulp.src([
		'./src/global.js',
		'./src/type.js',
		'./src/common.js',
		'./src/lang/number.js',
		'./src/lang/string.js',
		'./src/lang/function.js',
		'./src/lang/symbol.js',
		'./src/lang/object.ie.js',
		'./src/lang/object.ff.js',
		'./src/lang/object.modern.js',
		'./src/lang/Reflect.js',
		'./src/lang/Reflect.ie.js',
		'./src/lang/Reflect.ff.js',
		'./src/lang/Array.ie.js',
		'./src/lang/Array.modern.js',
		'./src/lang/Iterator.js',
		'./src/lang/Date.js',
		'./src/lang/Date.ie.js',
		'./src/lang/Date.ff.js',
		'./src/lang/Math.js',
		'./src/lang/Set.ff.js',
		'./src/lang/Set.js',
		'./src/utils/utils-array.js',
		'./src/lang/Map.ff.js',
		'./src/lang/Map.js',
		'./src/lang/JSON.js',
		'./src/lang/JSON.ff.js',
		'./src/lang/URLSearchParams.js',
		'./src/lang/URL.ie.js',
		'./src/lang/URL.ff.js',
		'./src/utils/utils-nextTick.js',
		'./src/lang/Promise.js',
		'./src/lang/Proxy.js',
		'./src/lang/Proxy.ie.js',
		'./src/lang/Proxy.revocable.js',
		'./src/browser/DOMParser.js',
		'./src/browser/XMLHttpRequest.js',
		'./src/browser/location.js',
		'./src/browser/head.js',
		'./src/browser/Node.ie.js',
		'./src/browser/Node.ff.js',
		'./src/utils/utils-cookie.js',
		'./src/browser/storage.ie.js',
		'./src/browser/currentScript.ie.js',
		'./src/browser/currentScript.ff.js',
		'./src/browser/console.js',
		'./src/browser/Event.js',
	])
	.pipe(concat('polyfill.js'))
	.pipe(gulp.dest('./'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/'));
});
gulp.task('compatTask', function () {
	return gulp.src([
		'./src/overload.js',
		'./src/type.js',
		'./src/browser.js',
		'./src/common.js',
		'./src/lang/number.js',
		'./src/lang/string.js',
		'./src/lang/function.js',
		'./src/lang/symbol.js',
		'./src/lang/object.ie.js',
		'./src/lang/object.modern.js',
		'./src/lang/Reflect.js',
		'./src/lang/Reflect.ie.js',
		'./src/lang/Array.ie.js',
		'./src/lang/Array.modern.js',
		'./src/lang/Date.js',
		'./src/lang/Date.ie.js',
		'./src/lang/Math.js',
		'./src/lang/Set.js',
		'./src/lang/Map.js',
		'./src/lang/JSON.js',
		'./src/lang/URLSearchParams.js',
		'./src/lang/URL.ie.js',
		'./src/utils/utils-nextTick.js',
		'./src/lang/Promise.js',
		'./src/lang/Proxy.js',
		'./src/lang/Proxy.ie.js',
		'./src/lang/Proxy.revocable.js',
		'./src/browser/XMLHttpRequest.js',
		'./src/browser/location.js',
		'./src/browser/head.js',
		'./src/browser/Node.ie.js',
		'./src/utils/utils-cookie.js',
		'./src/browser/storage.ie.js',
		'./src/browser/currentScript.ie.js',
		'./src/browser/console.js',
		'./src/browser/Event.js',
		'./src/utils/utils-object.js',
		'./src/utils/utils-string.js',
		'./src/utils/utils-number.js',
		'./src/utils/utils-array.js',
		'./src/utils/utils-ajax.js',
		'./src/utils/utils-script.ie.js',
		'./src/utils/utils-browser.ie.js',
		'./src/utils/utils-ready.ie.js',
		'./src/utils/utils-element.js',
		'./src/utils/utils-element.ie.js',
		'./src/utils/utils-selector.ie.js',
		'./src/utils/utils-form.js',
		'./src/utils/utils-attachEvent.js',
		'./src/utils/utils-attachEvent.ie.js',
		'./src/utils/utils-addEvent.ie.js',
		'./src/utils/utils-delegate.js',
	])
	.pipe(concat('sky.compat.js'))
	.pipe(gulp.dest('./'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/'));
});
gulp.task('modernTask', function () {
	return gulp.src([
		'./src/overload.js',
		'./src/type.js',
		'./src/browser.js',
		'./src/common.js',
		'./src/lang/number.js',
		'./src/lang/string.js',
		'./src/lang/function.js',
		'./src/lang/symbol.js',
		'./src/lang/object.ff.js',
		'./src/lang/object.modern.js',
		'./src/lang/Reflect.js',
		'./src/lang/Reflect.ff.js',
		'./src/lang/Array.modern.js',
		'./src/lang/Iterator.js',
		'./src/lang/Date.js',
		'./src/lang/Date.ff.js',
		'./src/lang/Math.js',
		'./src/lang/Set.ff.js',
		'./src/lang/Set.js',
		'./src/lang/Map.ff.js',
		'./src/lang/Map.js',
		'./src/lang/JSON.js',
		'./src/lang/JSON.ff.js',
		'./src/lang/URLSearchParams.js',
		'./src/lang/URL.ff.js',
		'./src/utils/utils-nextTick.js',
		'./src/lang/Promise.js',
		'./src/lang/Proxy.js',
		'./src/lang/Proxy.revocable.js',
		'./src/browser/XMLHttpRequest.js',
		'./src/browser/location.js',
		'./src/browser/head.js',
		'./src/browser/Node.ff.js',
		'./src/browser/currentScript.ff.js',
		'./src/browser/console.js',
		'./src/browser/Event.js',
		'./src/utils/utils-object.js',
		'./src/utils/utils-string.js',
		'./src/utils/utils-number.js',
		'./src/utils/utils-array.js',
		'./src/utils/utils-cookie.js',
		'./src/utils/utils-ajax.js',
		'./src/utils/utils-script.ff.js',
		'./src/utils/utils-browser.ff.js',
		'./src/utils/utils-ready.ff.js',
		'./src/utils/utils-element.js',
		'./src/utils/utils-element.ff.js',
		'./src/utils/utils-selector.ff.js',
		'./src/utils/utils-form.js',
		'./src/utils/utils-attachEvent.js',
		'./src/utils/utils-attachEvent.ff.js',
		'./src/utils/utils-addEvent.ff.js',
		'./src/utils/utils-delegate.js',
	])
	.pipe(concat('sky.modern.js'))
	.pipe(gulp.dest('./'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/'));
});
gulp.task('allTask', function () {
	return gulp.src([
		'./src/overload.js',
		'./src/type.js',
		'./src/browser.js',
		'./src/common.js',
		'./src/lang/number.js',
		'./src/lang/string.js',
		'./src/lang/function.js',
		'./src/lang/symbol.js',
		'./src/lang/object.ie.js',
		'./src/lang/object.ff.js',
		'./src/lang/object.modern.js',
		'./src/lang/Reflect.js',
		'./src/lang/Reflect.ie.js',
		'./src/lang/Reflect.ff.js',
		'./src/lang/Array.ie.js',
		'./src/lang/Array.modern.js',
		'./src/lang/Iterator.js',
		'./src/lang/Date.js',
		'./src/lang/Date.ie.js',
		'./src/lang/Date.ff.js',
		'./src/lang/Math.js',
		'./src/lang/Set.ff.js',
		'./src/lang/Set.js',
		'./src/lang/Map.ff.js',
		'./src/lang/Map.js',
		'./src/lang/JSON.js',
		'./src/lang/JSON.ff.js',
		'./src/lang/URLSearchParams.js',
		'./src/lang/URL.ie.js',
		'./src/lang/URL.ff.js',
		'./src/utils/utils-nextTick.js',
		'./src/lang/Promise.js',
		'./src/lang/Proxy.js',
		'./src/lang/Proxy.ie.js',
		'./src/lang/Proxy.revocable.js',
		'./src/browser/XMLHttpRequest.js',
		'./src/browser/location.js',
		'./src/browser/head.js',
		'./src/browser/Node.ie.js',
		'./src/browser/Node.ff.js',
		'./src/utils/utils-cookie.js',
		'./src/browser/storage.ie.js',
		'./src/browser/currentScript.ie.js',
		'./src/browser/currentScript.ff.js',
		'./src/browser/console.js',
		'./src/browser/Event.js',
		'./src/utils/utils-object.js',
		'./src/utils/utils-string.js',
		'./src/utils/utils-number.js',
		'./src/utils/utils-array.js',
		'./src/utils/utils-ajax.js',
		'./src/utils/utils-script.ie.js',
		'./src/utils/utils-script.ff.js',
		'./src/utils/utils-browser.ie.js',
		'./src/utils/utils-browser.ff.js',
		'./src/utils/utils-ready.ie.js',
		'./src/utils/utils-ready.ff.js',
		'./src/utils/utils-element.js',
		'./src/utils/utils-element.ie.js',
		'./src/utils/utils-element.ff.js',
		'./src/utils/utils-selector.js',
		'./src/utils/utils-form.js',
		'./src/utils/utils-attachEvent.js',
		'./src/utils/utils-attachEvent.ie.js',
		'./src/utils/utils-attachEvent.ff.js',
		'./src/utils/utils-addEvent.ff.js',
		'./src/utils/utils-delegate.js',
	])
	.pipe(concat('sky.js'))
	.pipe(gulp.dest('./'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/'));
});
gulp.task('default', gulp.parallel(['compatPolyfillTask','modernPolyfillTask','polyfillTask','compatTask', 'modernTask', 'allTask']));
