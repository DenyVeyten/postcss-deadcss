const utils = require('./utils');

module.exports = ({
  append = false,
  hash = false,
  url = utils.DEFAULT_BASE_URL,
} = {}) => {
  const insertFnName = append ? 'append' : 'prepend';
  const getSafeUrlComponent = hash ? utils.hashString : encodeURIComponent;

  return {
    postcssPlugin: 'postcss-deadcss',
    Rule(rule) {
      const safeUrlComponent = getSafeUrlComponent(rule.selector);
      const safeUrl = utils.getSafeUrl(url, safeUrlComponent);

      rule[insertFnName]({ prop: 'background-image', value: `url('${safeUrl}')` });
    },
  };
};

module.exports.postcss = true;
