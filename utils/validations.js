const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const hasStringValue = (string) => {
  return string && typeof string === 'string';
}

module.exports = {
  isValidEmail,
  hasStringValue
}