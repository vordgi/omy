import { helpMeEdit } from 'ommy/notion';
import getConfig from './getConfig';
import yargs from 'yargs/yargs';

export const helpme = async () => {
    const argv = await yargs(process.argv.slice(2))
        .usage('Usage: $0 <command> [options]')
        .command('helpme', 'helpme')
        .demandCommand(2)
        .help('h')
        .alias('h', 'help')
        .parse();

    if (typeof argv._[1] !== 'string') {
        console.error("You didn't enter what to help for");
        process.exit();
    }
    const config = await getConfig();

    console.log('Thinking...');

    let isTyping = false;
    await helpMeEdit({ prompt: argv._[1], token: config.token, spaceId: config.space, onPump: (part) => {
        if (!isTyping) {
            isTyping = true;
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(1);
        }
        process.stdout.write(part);
    } });
}
