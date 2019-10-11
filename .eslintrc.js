const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  globals: {
    page: true,
    YAPI: true,
    BASE_URL: true,
  },
  settings: {
    ...(strictEslint.settings || {}),
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', 'tsx'] } }
  },
  rules: {
    ...(strictEslint.rules || {}),
    'max-len': [
      'error',
      {
        'code': 120,
        'ignoreStrings': true,
        'ignoreComments': true,
        'ignoreRegExpLiterals': true,
        'ignoreTemplateLiterals': true,
        'ignoreTrailingComments': true,
      },
    ],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': [ 2, {
      'labelAttributes': ['label'],
    }],
  },
};
