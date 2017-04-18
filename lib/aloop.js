const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the aloop function.
 *
 *
 * @example
 *  ffmpeg().aloop()
 *    ...             // call filter configuration functions
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
    AloopFilter.prototype.withLoop = this.loop;
    AloopFilter.prototype.withSize = this.size;
    AloopFilter.prototype.withStart = this.start;
  }

  /**
   * Set the number of loops.
   * 
   * 
   * @param val
   */
  loop(val) {
    this._loop = val;
    return this;
  }

  /**
   * Set maximal number of samples.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
    return this;
  }

  /**
   * Set first sample of loop.
   * 
   * @param val
   */
  start(val) {
    this._start = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._loop) {
      opt['loop'] = this._loop;
    }
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._start) {
      opt['start'] = this._start;
    }

    addFilter(this.ffmpeg, {
      filter: 'aloop',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aloop = aloop;
