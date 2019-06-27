const slugify = require('slugify');
const groupBy = require('handlebars-group-by');

let group;

// Silly hack to get this helper register properly.
groupBy({
  registerHelper: (helpers) => {
    group = helpers.group;
  }
});


function highlight(code, lang) {
  try {
    try {
      return hljs.highlight(lang, code).value;
    } catch (err) {
      if (!/Unknown language/i.test(err.message)) {
        throw err;
      }
      return hljs.highlightAuto(code).value;
    }
  } catch (err) {
    return code;
  }
}

/**
 * Drop markdown "```language```" from the code
 */
function stripMarkdownLanguageMark(code) {
  return code.replace(/```\w+/, '').replace(/```/, '');
}

module.exports = {
  sortByLevel(snippets) {
    const levels = require('../schemas/snippet').schema.properties.level.enum;

    return levels.flatMap(
      level => snippets.filter(snippet => snippet.level === level)
    );
  },
  slugify: (str) => slugify(str, '-').toLowerCase(),
  capitalize: (str) =>
    str.charAt(0).toUpperCase() + str.slice(1),
  group(list, options) {

    return group.call(this, module.exports.sortByLevel(list), options);
  },
  markdown: require('helper-markdown')(highlight),
  json: (snippets) => {
    const newSnippet = snippets.map(s => ({
      content: s.contents.toString(),
      title: s.title,
      author: s.author,
      twitter: s.twitter,
      level: s.level,
      tags: s.tags,
      links: s.links,
      'file:app.component.ts': s['file:app.component.ts'],
      'file:app.module.ts': s['s.file:app.module.ts'],
    }));
    return JSON.stringify(newSnippet, null, 2)
  },
  hasCode(code) {
    return Object.keys(code).some(key => key.startsWith('file:'));
  },
  /**
   * Right now demo is in an iframe, the code is passed to an iframe encoded with base64.
   */
  codeToBase64(code) {
    const files = Object.entries(code).filter(([key, value]) => {
      return key.startsWith('file:');
    }).reduce((result, [key, value]) => {
      result[key.slice(5).trim()] = stripMarkdownLanguageMark(value);
      return result;
    }, {});

    return Object.keys(files).length
      ? encodeURIComponent(Buffer.from(JSON.stringify(files), 'binary')
        .toString('base64'))
      : '';
  },
  filterAndOrderForPresentation(snippets) {
    const snippetsByPath = snippets.reduce((snippets, snippet) => {
      snippets[snippet.path] = snippet;
      return snippets
    }, {});
    return [
      'adding-keyboard-shortcuts-to-elements.md',
      'global-event-listeners.md',
      'style-bindings.md',
      'injecting-document.md',
      'reusing-code-in-template.md',
      'two-way-binding-any-property.md',
      'getting-components-of-different-types-with-viewchild.md',
      'router-custom-preloading.md',
      'svg.md'
    ].map(path => snippetsByPath[path]);
  }
};
