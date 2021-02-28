import Analytics from './services/analytics';
import Episodes from './services/episodes';

const routes = [
    {
        method: 'get',
        path: '/topEpisodes/:seriesId([0-9]+)?/',
        handler: Episodes.getTopEpisodes.bind(Episodes)
    },
    {
        method: 'get',
        path: '/analytics/popularSeries',
        handler: Analytics.getPopularSeries.bind(Analytics)
    }
];

export default (app: any) => {
    routes.map(route => app[route.method](route.path, route.handler));
};