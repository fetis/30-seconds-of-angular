# 30 Seconds Of Angular
[![Logo](/templates/logo.png)](https://github.com/nycJSorg/30-seconds-of-angular)

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
### Links
{{{links}}}
{{/if}}

tags: {{tags}}

<br>[⬆ Back to top](#table-of-contents)<br><br>
{{/each}}
