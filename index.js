#!/usr/bin/env node

const boot = require('./boot');
const { container, args } = boot();

/** @type {DataFileGenerator} */
const generator = container.get('service.datafilegenerator');

generator.generate(args.out);
