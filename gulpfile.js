//сделать удаление desta

const {src, dest, watch, series, parallel} = require("gulp");
const browserSync = require("browser-sync").create();
//const del = require("del");

// Плагины
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")
const fileInclude = require("gulp-file-include")
const htmlmin = require("gulp-htmlmin");

// Обработка html
const html = () => {
	return src("./src/html/*.html")
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: "HTML",
				message: error.message
			}))
		}))
		.pipe(fileInclude())
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest("./dest"))
		.pipe(browserSync.stream());
}

//Удаление Директории
// const clear = () => {
// 	return del("./dest");
// }

// Сервер
const server = () => {
	browserSync.init({
		server: {
			baseDir: "./dest"
		}
	})
}

// Наблюдение
const watcher = () => {
	watch("./src/html/**/*.html", html)
}

// Задачи
exports.html = html;
exports.watch = watcher;
//exports.clear = clear;

// Сборка
exports.dev = series(html, parallel(watcher, server));