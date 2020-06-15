function get(obj, key) {
  if (key in obj) {
    return obj[key];
  }
  throw new Error(`key not found: '${key}'`);
}

module.exports = {
  get,
};
