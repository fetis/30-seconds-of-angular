[![Logo 30 Seconds of Angular](/templates/logo.png)](https://github.com/nycJSorg/30-seconds-of-angular)


[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> Curated collection of useful Angular snippets that you can understand in 30 seconds or less.



* Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
* Snippets are written in Angular 7.2.8+.

# 30 Seconds Of Angular

## Table of contents

{{#each snippets}}
* [{{title}}](#{{slugify title}})
{{/each}}

## Snippets
{{#each snippets}}
### {{title}}
{{{content}}}

{{#if bonus}}
<details>
<summary>Bonus</summary>
{{{bonus}}}
</details>
{{/if}}

{{#if links}}
#### Links
{{{links}}}
{{/if}}

tags: {{tags}}

<br>[⬆ Back to top](#table-of-contents)<br><br>
{{/each}}
