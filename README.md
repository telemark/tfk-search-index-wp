[![Build Status](https://travis-ci.com/telemark/tfk-search-index-wp.svg?branch=master)](https://travis-ci.com/telemark/tfk-search-index-wp)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# tfk-search-index-wp

Search indexer for wp sites

## Docker
To run this module as a service use the docker image.

Change the [docker.env](docker.env) to match your environment

Build
```sh
$ docker build -t tfk-search-index-wp .
```

or use the prebuilt image from [hub.docker.com](https://hub.docker.com/r/telemark/tfk-search-index-wp)

```sh
$ docker pull telemark/tfk-search-index-wp
```

Run a container

```sh
$ docker run --env-file=docker.env --rm tfk-search-index-wp
```

This will spin up a container. Do the job. Shut it down and remove it.

## Related

- [search-service](https://github.com/telemark/search-service) search micro service for elastic search

## License

[MIT](LICENSE)