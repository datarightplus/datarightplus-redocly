# Consumer Data Standards Redocs

This repository contains a [Redoc](https://github.com/Redocly/redoc) implementation of the [Consumer Data Standards](https://consumerdatastandardsaustralia.github.io/standards) governing the [Consumer Data Right](https://www.accc.gov.au/focus-areas/consumer-data-right-cdr-0).

## Current Status

We believe this documentation is currently up to date with **1.11.1** of the Standards with respect to the payloads.

## Enhancements

We have utilised the additional features OpenAPI 3 delivers to provide enhancements over and above the published Standards. These include:

- Use of `oneOf` notation providing for the describing of version based responses
- Use of `allOf` for compound definitions
- String `format` entries to provide hints of string type
