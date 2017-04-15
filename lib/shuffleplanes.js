const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the shuffleplanes function.
 *
 *
 * @example
 *  ffmpeg().shuffleplanes()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the shuffleplanes function.
 */
function shuffleplanes(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'shuffleplanes', function() {
    return new ShuffleplanesFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ShuffleplanesFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ShuffleplanesFilter.prototype.withMap0 = map0;
    ShuffleplanesFilter.prototype.withMap1 = map1;
    ShuffleplanesFilter.prototype.withMap2 = map2;
    ShuffleplanesFilter.prototype.withMap3 = map3;
  }

  /**
   * The index of the input plane to be used as the first output plane.
   * 
   * 
   * @param val
   */
  map0(val) {
    this.map0 = val;
    return this;
  }

  /**
   * The index of the input plane to be used as the second output plane.
   * 
   * 
   * @param val
   */
  map1(val) {
    this.map1 = val;
    return this;
  }

  /**
   * The index of the input plane to be used as the third output plane.
   * 
   * 
   * @param val
   */
  map2(val) {
    this.map2 = val;
    return this;
  }

  /**
   * The index of the input plane to be used as the fourth output plane.
   * 
   * 
   * @param val
   */
  map3(val) {
    this.map3 = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.map0) {
      opt['map0'] = this.map0;
    }
    if (this.map1) {
      opt['map1'] = this.map1;
    }
    if (this.map2) {
      opt['map2'] = this.map2;
    }
    if (this.map3) {
      opt['map3'] = this.map3;
    }

    addFilter(this.ffmpeg, {
      filter: 'shuffleplanes',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.shuffleplanes = shuffleplanes;
