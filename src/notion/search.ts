import { search as ommySearch } from 'ommy/notion';
import getConfig from './getConfig';

export const search = async (text: string) => {
    if (!text) {
        console.error("You didn't enter what to search for");
        process.exit();
    }
    const config = await getConfig();
    
    let waitingList = '';

    await ommySearch(text, config.token, (part) => {
        if (part.match(/<(a|$)/) || waitingList.match(/<(a|$)( |$)(h|$)(r|$)(e|$)(f|$)(=|$)("|$)([^"]+|$)("|$)( ?|$)(\/|$)(>|$)/)) {
            waitingList += part;
            waitingList = waitingList.replace(/<a href="[^"]+" ?\/>/, '');
        } else {
            process.stdout.write(waitingList + part);
            waitingList = '';
        }
    });
    process.stdout.write(waitingList);
}
