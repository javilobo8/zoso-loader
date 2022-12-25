# @javilobo8/zoso-loader

## Installation

```
npm i -S @javilobo8/zoso-loader
```

## Usage

TypeScript
```typescript
import zosoLoader from '@javilobo8/zoso-loader';
import yaml from 'js-yaml';

const configString = billieLoader.loadConfig({
  configPath: '/opt/config',
  file: 'servicetesting-api',
  type: 'yml',
});
const config = yaml.load(configString);
```

CommonJS
```javascript
const zosoLoader = require('@javilobo8/zoso-loader').default;
const yaml = require('js-yaml');

const configString = zosoLoader.loadConfig({
  configPath: '/opt/config',
  file: 'servicetesting-api',
  type: 'yml',
});
const config = yaml.load(configString);
```