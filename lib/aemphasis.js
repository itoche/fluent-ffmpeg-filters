const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the aemphasis function.
 *
 *
 * @example
 *  ffmpeg().aemphasis()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the aemphasis function.
 */
function aemphasis(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'aemphasis', function() {
    return new AemphasisFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AemphasisFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AemphasisFilter.prototype.withLevel_in = this.level_in;
    AemphasisFilter.prototype.withLevel_out = this.level_out;
    AemphasisFilter.prototype.withMode = this.mode;
    AemphasisFilter.prototype.withType = this.type;
  }

  /**
   * Set input gain.
   * 
   * 
   * @param val
   */
  level_in(val) {
    this._level_in = val;
    return this;
  }

  /**
   * Set output gain.
   * 
   * 
   * @param val
   */
  level_out(val) {
    this._level_out = val;
    return this;
  }

  /**
   * Set filter mode. For restoring material use reproduction mode, otherwise
   * use production mode. Default is reproduction mode.
   * 
   * 
   * @param val
   */
  mode(val) {
    this._mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  type(val) {
    this._type = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._level_in) {
      opt['level_in'] = this._level_in;
    }
    if (this._level_out) {
      opt['level_out'] = this._level_out;
    }
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._type) {
      opt['type'] = this._type;
    }

    addFilter(this.ffmpeg, {
      filter: 'aemphasis',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aemphasis = aemphasis;
