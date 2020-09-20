const crypto = require('crypto');

const MAX_URL_LENGTH = 2048;

module.exports.MAX_URL_LENGTH = MAX_URL_LENGTH;
module.exports.DEFAULT_BASE_URL = 'https://monitoring.host/pixel.png';

/* istanbul ignore next */
module.exports.hashString = (string) => crypto.createHash('md5').update(string).digest('hex');

module.exports.getSafeUrl = (baseUrl, query) => {
  const fullUrl = `${baseUrl}?${query}`;

  if (fullUrl.length <= MAX_URL_LENGTH) return fullUrl;

  const safeQuery = query.substring(0, MAX_URL_LENGTH - (fullUrl.length - query.length));

  return `${baseUrl}?${safeQuery}`;
};
