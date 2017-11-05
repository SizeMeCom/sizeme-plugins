const gulp = require("gulp");
const babel = require("gulp-babel");
const minify = require("gulp-minify");
const cleanDest = require("gulp-clean-dest");

gulp.task("default", () =>
    gulp.src("sizeme-selectric.js")
        .pipe(cleanDest("dist"))
        .pipe(babel({
            presets: [
                ["env", {
                    targets: {
                        "browsers": [
                            "> 5%",
                            "last 2 versions",
                            "not ie < 11",
                            "not ie_mob < 11"
                        ]
                    }
                }]
            ],
            plugins: ["transform-class-properties"]
        }))
        .pipe(minify({
            ext: {
                src: ".js",
                min: ".min.js"
            }
        }))
        .pipe(gulp.dest("dist"))
);