import { translate as ommyTranslate } from 'ommy/notion';
import getConfig from './getConfig';
import yargs from 'yargs/yargs';

export const translate = async () => {
    const argv = await yargs(process.argv.slice(2))
        .usage('Usage: $0 <command> [options]')
        .command('improve', 'improve writing')
        .demandCommand(2)
        .option('language', {
          alias: 'l',
          describe: 'language',
          string: true,
          nargs: 1,
          default: '',
          demandOption: true,
          choices: ['english', 'korean', 'chinese', 'japanese', 'spanish', 'russian', 'french', 'portuguese', 'german', 'italian', 'dutch', 'indonesian', 'filipino', 'vietnamese']
        })
        .help('h')
        .alias('h', 'help')
        .parse();

    if (typeof argv._[1] !== 'string') {
        console.error("You didn't enter what to improve for");
        process.exit();
    }
    const config = await getConfig();

    console.log('Thinking...');

    let isTyping = false;
    await ommyTranslate({ text: argv._[1], language: argv.language as any, token: config.token, spaceId: config.space, onPump: (part) => {
        if (!isTyping) {
            isTyping = true;
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(1);
        }
        process.stdout.write(part);
    } });
}
