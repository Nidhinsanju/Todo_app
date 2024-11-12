function isAlphanumeric(value) {
  const regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).+$/;
  return regex.test(value);
}
module.exports = isAlphanumeric;
