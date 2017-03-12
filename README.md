# fluent-ffmpeg-filters
Extend fluent-ffmpeg with fluent API for adding filters.

## vstack

```javascript
 ffmpeg().vstack()
  .inputs(2)
  .shortest(0)
  .build()
  ...
  .applyFilters() // call this when all filters have been configured
  ...
```
