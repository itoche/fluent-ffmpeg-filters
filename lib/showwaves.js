const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showwaves function.
 *
 *
 * @example
 *  ffmpeg().showwaves()
      ...             // call filter configuration functions
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
    Showwaves.prototype.withSize = size;
    Showwaves.prototype.withMode = mode;
    Showwaves.prototype.withN = n;
    Showwaves.prototype.withRate = rate;
    Showwaves.prototype.withSplit_channels = split_channels;
    Showwaves.prototype.withColors = colors;
    Showwaves.prototype.withScale = scale;
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
    this.size = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this.mode = val;
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
    this.n = val;
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
    this.rate = val;
    return this;
  }

  /**
   * Set if channels should be drawn separately or overlap. Default value is 0.
   * 
   * 
   * @param val
   */
  split_channels(val) {
    this.split_channels = val;
    return this;
  }

  /**
   * Set colors separated by ’|’ which are going to be used for drawing of each channel.
   * 
   * 
   * @param val
   */
  colors(val) {
    this.colors = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  scale(val) {
    this.scale = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.size) {
      opt.size = this.size;
    }
    if (this.mode) {
      opt.mode = this.mode;
    }
    if (this.n) {
      opt.n = this.n;
    }
    if (this.rate) {
      opt.rate = this.rate;
    }
    if (this.split_channels) {
      opt.split_channels = this.split_channels;
    }
    if (this.colors) {
      opt.colors = this.colors;
    }
    if (this.scale) {
      opt.scale = this.scale;
    }

    addFilter(this.ffmpeg, {
      filter: 'showwaves',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showwaves = showwaves;
