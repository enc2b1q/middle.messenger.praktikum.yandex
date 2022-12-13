import HTTP from "./http";

const host = 'https://jsonplaceholder.typicode.com';

describe('http tests', () => {

    it('Get returns needed value', (done) => {
        const http = new HTTP("", host);
        http.get('/posts/5')
            .then((response) => {
                const data = response as { id: number };
                if (data.id === 5) {
                    done();
                } else {
                    done(new Error('No such data'));
                }
            })
            .catch(
                (reason) => {
                    console.log('reason = ', reason);
                    done(new Error(`Fail. reason=${reason}`));
                }
            );
    });

    it('Post throw request returns needed value', (done) => {
        const http = new HTTP("", host);
        http.request('/posts',
            {
                method: "POST",
                data: {
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }

            },
        )
            .then((response) => {
                const data = response as { id: number };
                if (data.id === 101) {
                    done();
                } else {
                    done(new Error('No such data'));
                }
            })
            .catch(
                (reason) => {
                    console.log('reason = ', reason);
                    done(new Error(`Fail. reason=${reason}`));
                }
            );
    });
});
