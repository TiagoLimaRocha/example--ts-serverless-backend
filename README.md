# TS serverless backend


Example repository of a REST serverless pet store API, using typescript and terraform.

## Additional Resources

- [.editorconfig file](https://editorconfig.org/)
- [12 factor apps](https://12factor.net/)
- [Immutable Web App](https://immutablewebapps.org/)
- [asdf](https://asdf-vm.com)
- [Frontend Checklist](https://github.com/thedaviddias/Front-End-Checklist)
- [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- [language specific code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [Markdown Reference style link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links)
- [Project Guidelines](https://github.com/elsewhencode/project-guidelines)
- [VS CodeRecommended extensions](https://code.visualstudio.com/docs/editor/extension-gallery#_recommended-extensions)
- [JavaScript Clean Code Guidelines](https://github.com/ryanmcdermott/clean-code-javascript)

## Requirements

- [Docker]
- ...etc

<details>
<summary>:warning: <b>IMPORTANT NOTES</b> :warning:</summary>

- Use packages like [Homebrew], [docker], and [asdf]
- List any global installs here - prefer using [asdf] and [homebrew]
- Do not list frameworks and libraries. These should be included as project dependencies. [See Twelve-factor app - Dependencies](https://12factor.net/dependencies)

</details>

## Setup

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
commands here
```

<details>
<summary>:warning: <b>IMPORTANT NOTES</b> :warning:</summary>

- Here you should say what actually happens when you execute the code above.
- List any global installs and runtime setting here - prefer using [asdf] and [homebrew]
- This should be simple and concise and repeatable.
- Check with the team if Linux/Windows/Mac support is needed.

</details>

## Developing

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
packagemanager install
```

And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here.

<details>
<summary>:warning: <b>IMPORTANT NOTES</b> :warning:</summary>

- This should represent the day-to-day workflow
- this should not list global dependencies

</details>

### (Optional) Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here. for example:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

### Deploying

Give instructions on how to build and release a new version.

In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

Always try prioritise a CI/CD pipeline and build artifacts that are optimised generic environments.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

<details>
<summary>:warning: <b>IMPORTANT NOTES</b> :warning:</summary>

- If this uses ci/cd link out to it along with the environments.
- [12 factor apps](https://12factor.net/)
- [Immutable Web App](https://immutablewebapps.org/)
- Make use of badges where possible
  - [circleci status-badges](https://circleci.com/docs/2.0/status-badges)
  - [Github Workflow status badge](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)

</details>

## Versioning

We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).

## Configuration

Here you should write what are all of the configurations a user can enter when using the project.

<details>
<summary>:warning: <b>IMPORTANT NOTES</b> :warning:</summary>

- Note configuration is not secrets.
- Use `.env` and `.env.example`.
- Try to refrain from development and production references - let those values come from the env or the build.

</details>

## Tests

Describe and show how to run the tests with code examples.
Explain what these tests test and why.

```shell
Give an example
```

<details>
<summary>:warning: <b>IMPORTANT NOTES</b> :warning:</summary>

- This is sometimes included in the Developing script. This is fine, however if you are working with code that the sysops team is not familiar with, it's a good idea to split this out to make it more convenient for them.

</details>

## Api Reference

If the api is external, link to api documentation. If not describe your api including authentication methods as well as explaining all the endpoints with their required parameters.

## Database

- Explaining what database (and version) has been used. Provide docker-compose scripts
- Documents your database design and schemas, relations etc...
