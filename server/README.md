# hCaptcha challenge &mdash; server

This is the server code for the hCaptcha challenge.

# Running

Install the deps and start the server. You need to export a couple of env vars
so that the token verification and JWT check works. I recommend to use direnv
for this but you can also do it straight from the command line when starting
the server.

```
npm install
AUTH0_CLIENT_ID=auth0-client-ID HCAPTCHA_SECRET_KEY=hcaptcha-secret npm start
```
