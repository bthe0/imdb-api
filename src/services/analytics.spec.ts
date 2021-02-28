import app from '../server';
import supertest from 'supertest';

const request = supertest(app);

it('Returns proper response structure', async done => {
    await request.get('/topEpisodes/23')

    const res = await request.get('/analytics/popularSeries');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('series');
    expect(res.body.series.length).toBeGreaterThanOrEqual(1);
    expect(res.body.series[0]).toHaveProperty('seriesName');
    expect(res.body.series[0]).toHaveProperty('accessCount');
    done();
});

it('Returns popular series sorted by accessCount', async done => {
    const res = await request.get('/analytics/popularSeries');
    expect(res.status).toBe(200);

    let sorted = true;
    let lastAverageVotes;

    for (const episode of res.body.series) {
        if (typeof lastAverageVotes !== 'undefined'
            && episode.accessCount > lastAverageVotes)
        {
            sorted = false;
            break;
        }

        lastAverageVotes = episode.accessCount;
    }

    expect(sorted).toBe(true);
    done();
});