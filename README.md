# Consul mock

Sometimes you just need a fake consul host to connect to in localdev.
This enables you to run just a mock like that, so you do not need an entire VM with a working version of consul in there.

Run it as:

1. Clone the repository
1. `nvm use`
1. `yarn install`
1. `node index.js`
1. Optionally set an env variable PORT to point to a port if you do not wish to use the default `8500`.

Most endpoint are implemented, except the ones below:

- `/agent/token/*`
- `/agent/check/pass`
- `/agent/check/warn`
- `/agent/check/fail`
- `/agent/check/update`

In case you need to pass a parameter in the URL itself (not the query), always pass `PLACEHOLDER`.
