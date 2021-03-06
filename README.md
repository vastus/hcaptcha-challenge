# hCaptcha challenge

TODO(vastus): Deploy the app and add the URL.

## Server

The server is using express, express-jwt, and express-hcaptcha.

There are a couple of endpoints on the API:

- `POST /verify` - verifies the hCaptcha token
- `GET /secret` - returns secret message for authorized requests (JWT)

### Deploy to Heroku

Add the remote:

  $ git remote add heroku git@heroku.com:hcaptcha.git

Push the subtree:

  $ git subtree push --prefix=server heroku master

or force it if need be:

  $ git push --force heroku `git subtree split --prefix=server master`:master

## Client

The client a react app that serves a login page and renders a secret message
from the server for logged in users. To be able to login you have to first
prove that you're a human by clicking through the captcha.

After you've proved you're not a robot you can log in using GitHub or Google.
The OAuth integration is provided by Auth0.
