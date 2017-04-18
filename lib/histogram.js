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
    HistogramFilter.prototype.withLevel_height = this.level_height;
    HistogramFilter.prototype.withScale_height = this.scale_height;
    HistogramFilter.prototype.withDisplay_mode = this.display_mode;
    HistogramFilter.prototype.withLevels_mode = this.levels_mode;
    HistogramFilter.prototype.withComponents = this.components;
    HistogramFilter.prototype.withFgopacity = this.fgopacity;
    HistogramFilter.prototype.withBgopacity = this.bgopacity;
  }

  /**
   * Set height of level. Default value is 200.
   * Allowed range is [50, 2048].
   * 
   * 
   * @param val
   */
  level_height(val) {
    this._level_height = val;
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
    this._scale_height = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  display_mode(val) {
    this._display_mode = val;
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
    this._levels_mode = val;
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
    this._components = val;
    return this;
  }

  /**
   * Set foreground opacity. Default is 0.7.
   * 
   * 
   * @param val
   */
  fgopacity(val) {
    this._fgopacity = val;
    return this;
  }

  /**
   * Set background opacity. Default is 0.5.
   * 
   * @param val
   */
  bgopacity(val) {
    this._bgopacity = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._level_height) {
      opt['level_height'] = this._level_height;
    }
    if (this._scale_height) {
      opt['scale_height'] = this._scale_height;
    }
    if (this._display_mode) {
      opt['display_mode'] = this._display_mode;
    }
    if (this._levels_mode) {
      opt['levels_mode'] = this._levels_mode;
    }
    if (this._components) {
      opt['components'] = this._components;
    }
    if (this._fgopacity) {
      opt['fgopacity'] = this._fgopacity;
    }
    if (this._bgopacity) {
      opt['bgopacity'] = this._bgopacity;
    }

    addFilter(this.ffmpeg, {
      filter: 'histogram',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.histogram = histogram;
