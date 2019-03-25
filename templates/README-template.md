[![Logo 30 Seconds of Angular](/templates/logo.png)](https://github.com/nycJSorg/30-seconds-of-angular)


[![Build Status](https://travis-ci.com/nycJSorg/30-seconds-of-angular.svg?branch=master)](https://travis-ci.com/nycJSorg/30-seconds-of-angular) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> Curated collection of useful Angular snippets that you can understand in 30 seconds or less.



* Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
* Snippets are written in Angular 7.2.8+.

# 30 Seconds Of Angular

## Table of contents

{{#group snippets by="level"}}
{{value}}

{{#each items}}
* [{{title}}](#{{slugify title}})
{{/each}}
	
{{/group}}


## Snippets
{{#group snippets by="level"}}
### {{value}}
{{#each items}}
#### {{title}}
{{{content}}}

{{#if bonus}}
<details>
<summary>Bonus</summary>

{{{bonus}}}
</details>
{{/if}}

{{#if links}}
##### Links
{{{links}}}
{{/if}}

<br>[⭐ Interactive demo of this snippet](https://codelab-next.firebaseapp.com/angular/30-seconds/{{@index}}) | [⬆ Back to top](#table-of-contents) | tags: {{tags}} 
<br><br>
{{/each}}
{{/group}}
