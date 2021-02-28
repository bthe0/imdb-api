import config from './src/config';
import app from './src/server';

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));