#! /usr/bin/env node

import setConfig from './setConfig';
import { search } from './search';

const command = process.argv[2];

const HELP = `
    --help, -h - help on commands;
    configure, c - configure app;
    search - search in your notion (using notion ai);
`;

(async () => {
    if (command === '--help' || command === '-h') {
    	console.log(HELP);
    	process.exit();
    }
	if (command === 'configure' || command === 'c') {
		await setConfig();
		process.exit();
	}
	if (command === 'search') {
        await search(process.argv[3]);
		process.exit();
	}

	console.log(`Error: Unknown command`);
	process.exit();
})();
