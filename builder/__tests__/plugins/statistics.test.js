const childProcess = require('child_process');

const statisticsFn = require('../../plugins/statistics')();

const testFiles = {};

let testMetalsmith;

jest.mock('child_process');
childProcess.exec.mockImplementation((command, callback) => {
  callback(null, '\n  hash123,hsh,2019-06-07T12:00:00Z  \n');
});


beforeEach(() => {
  testMetalsmith = {
    _metadata: {
      snippets: [
        {
          author: 'a'
        },
        {
          author: 'b'
        },
        {
          author: 'a'
        }
      ],
      tags: {
        tag1: [],
        tag2: []
      }
    }
  }
});

test('statistics function', done => {
  statisticsFn(testFiles, testMetalsmith, () => {
    const { _metadata: { statistics} } = testMetalsmith;

    expect(statistics.snippets).toBe(3);
    expect(statistics.authors).toBe(2);
    expect(statistics.tags).toBe(2);
    expect(statistics.revision).toBe('hash123');
    expect(statistics.revisionAbbr).toBe('hsh');
    expect(statistics.revisionDate).toBe('2019-06-07');
    expect(statistics.generationDate).toMatch(/\d{4,}-\d\d-\d\d/);

    done();
  });
});
