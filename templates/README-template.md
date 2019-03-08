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

tags: {{tags}}

<br>[⬆ Back to top](#table-of-contents)<br><br>
{{/each}}
