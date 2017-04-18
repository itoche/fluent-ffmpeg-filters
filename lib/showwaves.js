const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showwaves function.
 *
 *
 * @example
 *  ffmpeg().showwaves()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the showwaves function.
 */
function showwaves(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'showwaves', function() {
    return new ShowwavesFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ShowwavesFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ShowwavesFilter.prototype.withSize = this.size;
    ShowwavesFilter.prototype.withMode = this.mode;
    ShowwavesFilter.prototype.withN = this.n;
    ShowwavesFilter.prototype.withRate = this.rate;
    ShowwavesFilter.prototype.withSplit_channels = this.split_channels;
    ShowwavesFilter.prototype.withColors = this.colors;
    ShowwavesFilter.prototype.withScale = this.scale;
  }

  /**
   * Specify the video size for the output. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Default value is 600x240.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this._mode = val;
    return this;
  }

  /**
   * Set the number of samples which are printed on the same column. A
   * larger value will decrease the frame rate. Must be a positive
   * integer. This option can be set only if the value for rate
   * is not explicitly specified.
   * 
   * 
   * @param val
   */
  n(val) {
    this._n = val;
    return this;
  }

  /**
   * Set the (approximate) output frame rate. This is done by setting the
   * option n. Default value is &quot;25&quot;.
   * 
   * 
   * @param val
   */
  rate(val) {
    this._rate = val;
    return this;
  }

  /**
   * Set if channels should be drawn separately or overlap. Default value is 0.
   * 
   * 
   * @param val
   */
  split_channels(val) {
    this._split_channels = val;
    return this;
  }

  /**
   * Set colors separated by ’|’ which are going to be used for drawing of each channel.
   * 
   * 
   * @param val
   */
  colors(val) {
    this._colors = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  scale(val) {
    this._scale = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._n) {
      opt['n'] = this._n;
    }
    if (this._rate) {
      opt['rate'] = this._rate;
    }
    if (this._split_channels) {
      opt['split_channels'] = this._split_channels;
    }
    if (this._colors) {
      opt['colors'] = this._colors;
    }
    if (this._scale) {
      opt['scale'] = this._scale;
    }

    addFilter(this.ffmpeg, {
      filter: 'showwaves',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showwaves = showwaves;
