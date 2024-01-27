import cacache from 'cacache';

const getConfig = async (inSetConfig?: boolean) => {
	const existedCache = await cacache.ls('/tmp/omy');

	if (existedCache['omy-notion-config']) {
		const { data } = await cacache.get('/tmp/omy', 'omy-notion-config');

		const cachedConfig = JSON.parse(data.toString());

		if (cachedConfig?.token) return cachedConfig;
	} else if (inSetConfig) {
		return {};
	}

	console.log('\n\tomy: Please configure application.\n');
	process.exit();
};

export default getConfig;
