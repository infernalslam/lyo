#! /usr/bin/env node
'use strict';

const path = require('path').posix;
const camelCase = require('camelcase');

function parseOpts(flags, pkg) {
	if (pkg.lyo && typeof pkg.lyo === 'object') {
		for (const f in pkg.lyo) {
			flags[f] = flags.hasOwnProperty(f) ? flags[f] : pkg.lyo[f];
		}
	}

	flags.input = flags.input || pkg.main || 'index.js';
	if (flags.remote && flags.inputDir) {
		flags.input = path.join(flags.inputDir, flags.input);
	}
	const defaultName = pkg.name ? (pkg.name + '.min.js') : path.basename(flags.input).replace(/.js$/, '.min.js');
	if (!flags.output) {
		flags.output = flags.remote ? defaultName : path.join('dist', defaultName);
	} else if (!path.extname(flags.output)) {
		flags.output = path.join(flags.output, defaultName);
	}
	flags.name = flags.name || camelCase(pkg.name || '') ||
        (pkg.main ? camelCase(pkg.main.replace(/.js$/, '')) : '') || 'module';
	return flags;
}

module.exports = parseOpts;
