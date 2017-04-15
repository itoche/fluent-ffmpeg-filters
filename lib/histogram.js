const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the histogram function.
 *
 *
 * @example
 *  ffmpeg().histogram()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the histogram function.
 */
function histogram(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'histogram', function() {
    return new HistogramFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class HistogramFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Histogram.prototype.withLevel_height = level_height;
    Histogram.prototype.withScale_height = scale_height;
    Histogram.prototype.withDisplay_mode = display_mode;
    Histogram.prototype.withLevels_mode = levels_mode;
    Histogram.prototype.withComponents = components;
    Histogram.prototype.withFgopacity = fgopacity;
    Histogram.prototype.withBgopacity = bgopacity;
  }

  /**
   * Set height of level. Default value is 200.
   * Allowed range is [50, 2048].
   * 
   * 
   * @param val
   */
  level_height(val) {
    this.level_height = val;
    return this;
  }

  /**
   * Set height of color scale. Default value is 12.
   * Allowed range is [0, 40].
   * 
   * 
   * @param val
   */
  scale_height(val) {
    this.scale_height = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  display_mode(val) {
    this.display_mode = val;
    return this;
  }

  /**
   * Set mode. Can be either linear, or logarithmic.
   * Default is linear.
   * 
   * 
   * @param val
   */
  levels_mode(val) {
    this.levels_mode = val;
    return this;
  }

  /**
   * Set what color components to display.
   * Default is 7.
   * 
   * 
   * @param val
   */
  components(val) {
    this.components = val;
    return this;
  }

  /**
   * Set foreground opacity. Default is 0.7.
   * 
   * 
   * @param val
   */
  fgopacity(val) {
    this.fgopacity = val;
    return this;
  }

  /**
   * Set background opacity. Default is 0.5.
   * 
   * @param val
   */
  bgopacity(val) {
    this.bgopacity = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.level_height) {
      opt['level_height'] = this.level_height;
    }
    if (this.scale_height) {
      opt['scale_height'] = this.scale_height;
    }
    if (this.display_mode) {
      opt['display_mode'] = this.display_mode;
    }
    if (this.levels_mode) {
      opt['levels_mode'] = this.levels_mode;
    }
    if (this.components) {
      opt['components'] = this.components;
    }
    if (this.fgopacity) {
      opt['fgopacity'] = this.fgopacity;
    }
    if (this.bgopacity) {
      opt['bgopacity'] = this.bgopacity;
    }

    addFilter(this.ffmpeg, {
      filter: 'histogram',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.histogram = histogram;
