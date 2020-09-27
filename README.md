# postcss-deadcss
[PostCSS] plugin that helps to find dead css in a project.

Implements technique from https://csswizardry.com/2018/01/finding-dead-css/

[PostCSS]: https://github.com/postcss/postcss

```css
/* Input example */
.foo {
    color: red;
}
```

```css
/* Output example */
.foo {
    background-image: url('https://monitoring.host/pixel.png?.foo');
    color: red;
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-deadcss
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings. Alternatively, you can use the [postcss-cli] to run postcss-deadcss from CLI:

```sh
npm install postcss-cli

# after configuration:
npx postcss *.css -d output/
```

See `npx postcss -h` for help.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
    require('autoprefixer'),
+   require('postcss-deadcss')({
+     url: 'https://monitoring.host/pixel.png',
+     hash: true,
+   }),
  ]
}
```

Available options:

| Name   | Type    | Default | Description |
|--------|---------|---------|-------------|
| url    | string  | `'https://monitoring.host/pixel.png'` | Base url with transparent image to load |
| hash   | boolean | `false` | To use md5 hashes of seloctors for background image urls, otherwise to use URL ecoded selectors |
| append | boolean | `false` | To append background-image declaration instead of prepend it (this will break styling during testing, but is not required manual checks if background-image has been overwritten by other declaration below in the same rule or not)

**Step 4:** Deploy css and [transparent image] and start monitoring requests to the image. After considered amount of time you can remove css rules that hasn't been requested or rewrite code when css rules are used too unfrequently. **Enjoy the results!** :tada:

[official docs]: https://github.com/postcss/postcss#usage
[postcss-cli]: https://github.com/postcss/postcss-cli
[transparent image]: pixel.png
