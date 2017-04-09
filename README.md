# fluent-ffmpeg-filters
Extend fluent-ffmpeg with fluent API for adding ffmpeg filters, as listed [here](http://ffmpeg.org/ffmpeg-filters.html).

`lib` directory contains one file per filter. Each filter module exposes a function that augment the ffmpeg instance.

Here is an example of use with the `vstack` filter.

```javascript
let ffmpeg = require('fluent-ffmpeg');
const vstack = require('fluent-ffmpeg-filters').vstack;

ffmpeg = vstack(ffmpeg);

ffmpeg('./one.jpg')
  .input('./two.jpg')
  .vstack()
  .input(2)
  .shortest(0)
  .build()
  .applyFilters()
```

### Generic functions
These functions are available on each filter.

#### build(): register the filter configuration
The `build()` function is to be called once the filter function and its configuration function have all been called. Calling `build()` registers the filter configuration on the ffmpeg instance.

#### applyFilters(): configure all filters
Apply the configurations of all filters to the ffmpeg instance. Call it only once.
