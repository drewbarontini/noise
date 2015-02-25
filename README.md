Noise
=====

[Gulp](http://gulpjs.com/) template files.

What does this particular Gulp setup do?
----------------------------------------

- Watches and compiles Sass and CoffeeScript files
- Minifies CSS and JavaScript files
- Lints CoffeeScript files
- Tests CSS file using `csscss` and `parker`
- Tests JavaScript file using `jshint`
- Runs Autoprefixer on CSS

Available Tasks
---------------

```
$ gulp
```

> Runs the default `watch` task.

```
$ gulp build
```

> Minifies both the CSS and JavaScript and outputs to the `build/` directory.

```
$ gulp coffee
```

> Compiles CoffeeScript files.

```
$ gulp link
```

> Lints CoffeeScript files.

```
$ gulp minify-css
```

> Minifies CSS file.

```
$ gulp sass
```

> Compiles Sass files.

```
$ gulp test-css
```

> Runs `csscss` and `parker` on CSS file.

```
$ gulp test-js
```

> Runs `jshint` on JavaScript file.

```
$ gulp ugilify
```

> Minifies JavaScript file.

Setup
-----

```
$ npm install
```
