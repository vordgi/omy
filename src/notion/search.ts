import { search as ommySearch } from 'ommy/notion';
import getConfig from './getConfig';

export const search = async (text: string) => {
    if (!text) {
        console.error("You didn't enter what to search for");
        process.exit();
    }
    const config = await getConfig();

    console.log('Thinking...');

    let waitingList = '';
    let isTyping = false;
    await ommySearch({text, token: config.token, spaceId: config.space, onPump: (part) => {
        if (!isTyping) {
            isTyping = true;
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(1);
        }
        if (part.match(/<(a|$)/) || waitingList.match(/<(a|$)( |$)(h|$)(r|$)(e|$)(f|$)(=|$)("|$)([^"]+|$)("|$)( ?|$)(\/|$)(>|$)/)) {
            waitingList += part;
            waitingList = waitingList.replace(/<a href="[^"]+" ?\/>/, '');
        } else {
            process.stdout.write(waitingList + part);
            waitingList = '';
        }
    }});
    process.stdout.write(waitingList);
}
