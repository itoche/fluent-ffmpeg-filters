[![npm version](https://badge.fury.io/js/fluent-ffmpeg-filters.svg)](https://badge.fury.io/js/fluent-ffmpeg-filters)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/itoche/fluent-ffmpeg-filters.js/master/LICENSE)

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
  .applyVideoFilters()
```

### Generic functions
These functions are available on each filter.

#### build(): register the filter configuration
The `build()` function is to be called once the filter function and its configuration function have all been called. Calling `build()` registers the filter configuration on the ffmpeg instance.

#### applyComplexFilter(): configure all filters
Apply the configurations of all filters to the ffmpeg instance. Call it only once.

#### applyVideoFilters(): configure video filters
Apply the configurations of video filters to the ffmpeg instance. 

#### applyAudioFilters(): configure audio filters
Apply the configurations of audio filters to the ffmpeg instance. 
