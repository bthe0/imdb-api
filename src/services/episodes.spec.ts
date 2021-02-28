import app from '../server';
import supertest from 'supertest';

const request = supertest(app);

it('Handles invalid seriesId parameter correctly', async done => {
    const res = await request.get('/topEpisodes/aaa');
    expect(res.status).toBe(404);
    done();
});

it('Returns proper response structure', async done => {
    const res = await request.get('/topEpisodes/23');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('episodes');
    expect(res.body.episodes.length).toBeGreaterThanOrEqual(1);
    expect(res.body.episodes[0]).toHaveProperty('averageVotes');
    expect(res.body.episodes[0]).toHaveProperty('episodeName');
    done();
});

it('Returns episodes sorted by averageVote', async done => {
    const res = await request.get('/topEpisodes/23');
    expect(res.status).toBe(200);

    let sorted = true;
    let lastAverageVotes;

    for (const episode of res.body.episodes) {
        if (typeof lastAverageVotes !== 'undefined'
            && episode.averageVotes > lastAverageVotes)
        {
            sorted = false;
            break;
        }

        lastAverageVotes = episode.averageVotes;
    }

    expect(sorted).toBe(true);
    done();
});