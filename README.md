# Linterhub-build-info
It's application which represent build info.

## Install the Polymer-CLI

First, install [Node.js](https://nodejs.org/en/).
Then, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed.

## Viewing Your Application

```
1 - Go to .\lib\front-end\
2 - $ polymer serve
3 - Go to .\lib\back-end\
4 - $ node server.js
```

## Building Your Application

```
$ polymer build
```

This will create a `build/` folder with `bundled/` and `unbundled/` sub-folders
containing a bundled (Vulcanized) and unbundled builds, both run through HTML,
CSS, and JS optimizers.

You can serve the built versions by giving `polymer serve` a folder to serve
from:

```
$ polymer serve build/bundled
```

## Running Tests

```
$ polymer test
```


