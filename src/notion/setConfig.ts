
import inquirer from 'inquirer';
import cacache from 'cacache';
import getConfig from './getConfig';
import getSpaces from 'ommy/notion/lib/getSpaces';

const prompt = inquirer.createPromptModule();

const setConfig = async () => {
	const config = await getConfig(true);

	const notionToken = await prompt([
		{
			type: 'password',
			name: 'token',
			message: 'Notion token:',
			default: config?.token
		}
	]);
	const userSpacesData = await getSpaces(notionToken.token);
	const userSpaces = Object.values(userSpacesData)[0] as any;
	const userSpaceList = Object.values(userSpaces.space);

	const notionSpace = await prompt([
		{
			type: 'list',
			name: 'space',
			message: 'Notion token:',
			default: config?.space,
			choices: userSpaceList.map(({value}: any) => ({
				name: `${value.name} (${value.id})`, value: value.id
			}))
		}
	]);

	await cacache.put('/tmp/omy', 'omy-notion-config', JSON.stringify({
		token: notionToken.token,
		space: notionSpace.space,
	}));
	console.log('\nSaved\n');
};

export default setConfig;
