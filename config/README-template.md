[![Logo 30 Seconds of Angular](/config/logo.png)](https://github.com/nycJSorg/30-seconds-of-angular)


[![Build Status](https://travis-ci.com/nycJSorg/30-seconds-of-angular.svg?branch=master)](https://travis-ci.com/nycJSorg/30-seconds-of-angular) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> Curated collection of useful Angular snippets that you can understand in 30 seconds or less.



* Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
* Snippets are written in Angular 7.2.8+.

# 30 Seconds Of Angular

## Table of contents

{{#group snippets by="level"}}
{{capitalize value}} snippets

{{#each items}}
* [{{title}}](#{{slug}})
{{/each}}
	
{{/group}}

{{#group snippets by="level"}}

## {{capitalize value}} snippets

{{#each items}}
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

<br>[⭐ Interactive demo of this snippet](https://codelab-next.firebaseapp.com/30/angular/{{slug}}) | [⬆ Back to top](#table-of-contents) | tags: {{#each tags}}[{{this}}](https://codelab-next.firebaseapp.com/30/angular/tag/{{this}}) {{/each}} 
<br><br>
{{/each}}
{{/group}}
