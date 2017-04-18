const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showwavespic function.
 *
 *
 * @example
 *  ffmpeg().showwavespic()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the showwavespic function.
 */
function showwavespic(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'showwavespic', function() {
    return new ShowwavespicFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ShowwavespicFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ShowwavespicFilter.prototype.withSize = this.size;
    ShowwavespicFilter.prototype.withSplit_channels = this.split_channels;
    ShowwavespicFilter.prototype.withColors = this.colors;
    ShowwavespicFilter.prototype.withScale = this.scale;
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
      filter: 'showwavespic',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showwavespic = showwavespic;
