const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the aloop function.
 *
 *
 * @example
 *  ffmpeg().aloop()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the aloop function.
 */
function aloop(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'aloop', function() {
    return new AloopFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AloopFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Aloop.prototype.withLoop = loop;
    Aloop.prototype.withSize = size;
    Aloop.prototype.withStart = start;
  }

  /**
   * Set the number of loops.
   * 
   * 
   * @param val
   */
  loop(val) {
    this.loop = val;
    return this;
  }

  /**
   * Set maximal number of samples.
   * 
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }

  /**
   * Set first sample of loop.
   * 
   * @param val
   */
  start(val) {
    this.start = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.loop) {
      opt.loop = this.loop;
    }
    if (this.size) {
      opt.size = this.size;
    }
    if (this.start) {
      opt.start = this.start;
    }

    addFilter(this.ffmpeg, {
      filter: 'aloop',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aloop = aloop;
