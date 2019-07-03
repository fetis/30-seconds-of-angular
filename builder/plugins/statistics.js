const exec = require('child_process').exec;

function getSnippetsCount(metadata) {
  return metadata.snippets.length;
}

function getAuthorsCount({snippets}) {
  const authors = snippets.map(snippet => snippet.author);
  const set = new Set(authors);

  return set.size;
}

function getTagsCount({tags}) {
  return Object.keys(tags).length;
}

function getISODate(date) {
  return date.toISOString().split('T')[0];
}

function getGenerationInfo() {
  return new Promise((resolve, reject) => {
    const lastCommitInfo = 'git log -1 --pretty=format:%H,%h,%ai';

    exec(lastCommitInfo, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        const [revision, revisionAbbr, revDate] = stdout.trim().split(',');
        const revisionDate = new Date(revDate);
        const genDate = new Date();

        resolve({
          revision,
          revisionAbbr,
          revisionDate: getISODate(revisionDate),
          generationDate: getISODate(genDate),
        });
      }
    });
  });
}

module.exports = () => (files, {_metadata}, done) => {
  _metadata.statistics = {
    snippets: getSnippetsCount(_metadata),
    authors: getAuthorsCount(_metadata),
    tags: getTagsCount(_metadata)
  };

  getGenerationInfo()
    .then(gitData => {
      _metadata.statistics = {
        ..._metadata.statistics,
        ...gitData
      };
    })
    .catch(error => {
      console.warn(`Can not get Git revision`);
      console.warn(error);
    })
    .finally(done);
};
