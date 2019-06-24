const exec = require('child_process').exec;

function getSnippetsCount(metadata) {
  return metadata.snippets.length;
}

function getAuthorsCount(metadata) {
  const set = new Set();

  metadata.snippets.forEach(snippet => set.add(snippet.author));

  return set.size;
}

function getTagsCount(metadata) {
  const tags = metadata.tags;
  return Object.keys(tags).length;
}

module.exports = () => (files, {_metadata}, done) => {
  _metadata.statistics = {
    snippets: getSnippetsCount(_metadata),
    authors: getAuthorsCount(_metadata),
    tags: getTagsCount(_metadata)
  };

  exec('git rev-parse HEAD', (error, stdout) => {
    if (error) {
      console.warn(`Can not get Git revision`);
      console.warn(error);
    } else {
      _metadata.statistics.revision = stdout.trim();
    }

    done();
  });

};

