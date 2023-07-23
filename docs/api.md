# API

## Basic

- `/npm/<PACKAGE>[@VERSION]/[PATH]` - NPM package

`PACKAGE` is the name of the package (required), `VERSION` is the version of the package (default to `latest`), and `PATH` is the path to the file in the package.

- `/gh/<USER>/<REPO>[@BRANCH]/[PATH]` - GitHub repository

`USER` is the name of the user or organization (required), `REPO` is the name of the repository (required), `BRANCH` is the branch of the repository (default to `master`), and `PATH` is the path to the file in the repository.

## Features

- Minify

You can add `?minify` or `?min` to the URL to minify the file. Supported file types are `js`, `css`, `json`.
