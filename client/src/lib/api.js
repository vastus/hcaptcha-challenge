import config from '../config';

const GET = (path, options) =>
  fetch(config.API_URL + path, options);

const POST = (path, payload) =>
  fetch(config.API_URL + path, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(payload),
  });

export {
  GET,
  POST
};
