const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the loop function.
 *
 *
 * @example
 *  ffmpeg().loop()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the loop function.
 */
function loop(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'loop', function() {
    return new LoopFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class LoopFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    LoopFilter.prototype.withLoop = this.loop;
    LoopFilter.prototype.withSize = this.size;
    LoopFilter.prototype.withStart = this.start;
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
   * Set maximal size in number of frames.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
    return this;
  }

  /**
   * Set first frame of loop.
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
      filter: 'loop',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.loop = loop;
