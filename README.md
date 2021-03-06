<h3 align="center">
  <img src="graphics/logo.png?raw=true" alt="Plattar Logo" width="600">
</h3>

[![install size](https://packagephobia.com/badge?p=@plattar/plattar-analytics)](https://packagephobia.com/result?p=@plattar/plattar-analytics)
[![NPM](https://img.shields.io/npm/v/@plattar/plattar-analytics)](https://www.npmjs.com/package/@plattar/plattar-analytics)
[![License](https://img.shields.io/npm/l/@plattar/plattar-analytics)](https://www.npmjs.com/package/@plattar/plattar-analytics)

_plattar-analytics_ allows reading, querying and writing analytics data to plattar backend services.

### _Quick Use_

-   ES2015 & ES2019 Builds via [jsDelivr](https://www.jsdelivr.com/)

```javascript
// Minified Version ES2015 & ES2019 (Latest)
https://cdn.jsdelivr.net/npm/@plattar/plattar-analytics/build/es2015/plattar-analytics.min.js
https://cdn.jsdelivr.net/npm/@plattar/plattar-analytics/build/es2019/plattar-analytics.min.js

// Standard Version ES2015 & ES2019 (Latest)
https://cdn.jsdelivr.net/npm/@plattar/plattar-analytics/build/es2015/plattar-analytics.js
https://cdn.jsdelivr.net/npm/@plattar/plattar-analytics/build/es2019/plattar-analytics.js
```

### _Installation_

-   Install using [npm](https://www.npmjs.com/package/@plattar/plattar-analytics)

```console
npm install @plattar/plattar-analytics
```

### _Analytics Query Example_

```js
// create a new Analytics instance for a particular application
const analytics = new PlattarAnalytics.Analytics("your-application-id");

// default is production, can be production, staging or dev
analytics.origin = "production";
// default is track, can be track or pageview
analytics.event = "track";
// your analytics query
const query = {
  // create the analytics query JSON
}

// send the query
analytics.query(query).then((results) => {
  // do something with results. Results structure varies based on query
  console.log(results);
}).catch((err) => {
  console.error(err);
});

```
