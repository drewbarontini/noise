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
- Compiles multiple SVG icons into one SVG file

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
$ gulp compile:coffee
```

> Compiles CoffeeScript files.

```
$ gulp compile:sass
```

> Compiles Sass files.

```
$ gulp connect
```

> Starts server with LiveReload

```
$ gulp html
```

> Moves `source/index.html` to `build/index.html`

```
$ gulp icons
```

> Compiles multiple SVG icons into one SVG file.

```
$ gulp images
```

> Moves `source/images` to `build/images`

```
$ gulp lint:coffee
```

> Lints CoffeeScript files.

```
$ gulp minify:css
```

> Minifies CSS file.

```
$ gulp minify:js
```

> Minifies JavaScript file.

```
$ gulp test:css
```

> Runs `csscss` and `parker` on CSS file.

```
$ gulp test:js
```

> Runs `jshint` on JavaScript file.

Setup
-----

```
$ npm install
```
