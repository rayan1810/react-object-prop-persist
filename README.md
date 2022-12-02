# Babel Plugin react-object-prop-persist

Prevents component re-rendering caused by object literals passed as props.

## Installation -

Using yarn :

```bash
yarn add -D react-object-prop-persist
```

Using npm :

```bash
npm install --save-dev react-object-prop-persist
```

## Usage -

Simply add this plugin in your App's `babel.config.js` :

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [...YOUR_APP_PRESETS],
    plugins: ["react-object-prop-persist", ...YOUR_OTHER_PLUGINS],
  };
};
```

## To setup the Development environment -

- clone this Repo
- `yarn` or `npm install`
- `cd example && yarn && cd ..` or `cd example && npm install && cd ..`
- `yarn dev:web` or `npm run dev:web` to run the example app make your changes in `index.js`.
