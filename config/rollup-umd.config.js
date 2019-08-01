import resolve from 'rollup-plugin-node-resolve';

import sourcemaps from 'rollup-plugin-sourcemaps';

const pkg = require('../package.json');

const names = pkg.name.match(/([a-z-]+)/g);
const name = names[names.length -1];
const upperName = name.replace(/-([a-z])/g, (g) => {
  return g[1].toUpperCase();
});

const globals = {
  '@angular/animations': 'ng.animations',
  '@angular/common': 'ng.common',
  '@angular/core': 'ng.core',
  '@angular/forms': 'ng.forms',
  '@angular/router': 'ng.router',

  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-server': 'ng.platformServer',

  'rxjs': 'Rx',
  'rxjs/operator': 'Rx.Observable.prototype',
  'rxjs/operators': 'Rx.Observable.prototype'
};

const external = Object.keys(globals);

export default {
  external: external,
  input: `${pkg.module}`,
  output: {
    file: `${pkg.main}`,
    format: 'umd',
    name: `zef.${upperName}`,
    globals: globals,
    sourcemap: true,
    exports: 'named'
  },
  plugins: [
    resolve(),
    sourcemaps()
  ]
}
