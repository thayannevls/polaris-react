const {execSync} = require('child_process');
const {resolve} = require('path');

const root = resolve(__dirname, '..');

const execConfig = {stdio: 'inherit', cwd: root};

// Pull polaris-tokens into the styles folder
execSync(`yarn run copy-polaris-tokens`, execConfig);

// Run a TypeScript build to generate type definitions (but no JS)
execSync(`yarn run tsc -p tsconfig.build.json`, execConfig);

// Downlevel type declarations to support consuming apps that use older versions
// of typescript
execSync(`yarn run downlevel-dts types/latest types/3.4`, execConfig);

// Run a Rollup build to generate JS and styles
execSync(`yarn run rollup -c config/rollup/rollup.config.js`, execConfig);

// Copy documentation into the docs folder
execSync(`yarn run copyfiles './src/**/*.md' './docs' --up=1`, execConfig);
