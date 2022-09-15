import App from '@/app';
import IndexRoute from '@routes/index.route';
import StoreRoute from '@routes/store.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new StoreRoute()]);

app.listen();
