const gulp = require("gulp");
const babel = require("gulp-babel");
const del = require("del");
const runSequence = require("run-sequence");
require("gulp-release-tag")(gulp);

gulp.task("clean", () =>
    del([
        "dist"
    ])
);

gulp.task("default", ["clean"], () =>
    gulp.src("sizeme-selectric.js")
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
        .pipe(gulp.dest("dist"))
);

gulp.task("make-release", () => runSequence("default", "release"));