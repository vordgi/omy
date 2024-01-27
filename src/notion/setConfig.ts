
import inquirer from 'inquirer';
import cacache from 'cacache';
import getConfig from './getConfig';

const prompt = inquirer.createPromptModule();

const setConfig = async () => {
	const config = await getConfig(true);

	const notionConfig = await prompt([
		{
			type: 'password',
			name: 'token',
			message: 'Notion token:',
			default: config?.notion?.token
		}
	]);

	await cacache.put('/tmp/omy', 'omy-notion-config', JSON.stringify(notionConfig));
	console.log('\n\tSaved\n');
};

export default setConfig;
