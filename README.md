# DataRight+: Redocly

This repository contains a [Redocly](https://github.com/Redocly/redoc) repository providing an OpenAPI 3 formatted specification of the resource endpoints described within the [DataRight+](https://dataright.plus) initiative.

# Contributing

We utilise a Git Flow approach and encourage people to install the [git-flow](https://danielkummer.github.io/git-flow-cheatsheet/) toolset. When performing `git flow init` be sure to specify a blank tag prefix as we utilise RFC style tagging.

All changes should be presented as pull requests on `develop`

# Releasing

The published version of this specification is _always_ based on the current `develop` branch with tags being used to track checkpoints, generate releases and provide static exports of the agreed versions.

## Creating a Release

The following is shorthand for how to create a release:
1. Ensure all changes are committed
2. Run `git flow release start RELEASENAME` where RELEASENAME _should_ be an RFC style name such as `ID1`
3. Run `git flow release finish RELEASENAME`, CI/CD will replace the appropriate version number
4. Push the tags with `git push origin --tags`
5. Push the main branch `git push origin main`
6. Push the develop branch `git push origin develop`

