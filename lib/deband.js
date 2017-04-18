const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the deband function.
 *
 *
 * @example
 *  ffmpeg().deband()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the deband function.
 */
function deband(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'deband', function() {
    return new DebandFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DebandFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    DebandFilter.prototype.with_1thr = this._1thr;
    DebandFilter.prototype.with_2thr = this._2thr;
    DebandFilter.prototype.with_3thr = this._3thr;
    DebandFilter.prototype.with_4thr = this._4thr;
    DebandFilter.prototype.withRange = this.range;
    DebandFilter.prototype.withDirection = this.direction;
    DebandFilter.prototype.withBlur = this.blur;
    DebandFilter.prototype.withCoupling = this.coupling;
  }

  /**
   * Set banding detection threshold for each plane. Default is 0.02.
   * Valid range is 0.00003 to 0.5.
   * If difference between current pixel and reference pixel is less than threshold,
   * it will be considered as banded.
   * 
   * 
   * @param val
   */
  _1thr(val) {
    this.__1thr = val;
    return this;
  }

  /**
   * Set banding detection threshold for each plane. Default is 0.02.
   * Valid range is 0.00003 to 0.5.
   * If difference between current pixel and reference pixel is less than threshold,
   * it will be considered as banded.
   * 
   * 
   * @param val
   */
  _2thr(val) {
    this.__2thr = val;
    return this;
  }

  /**
   * Set banding detection threshold for each plane. Default is 0.02.
   * Valid range is 0.00003 to 0.5.
   * If difference between current pixel and reference pixel is less than threshold,
   * it will be considered as banded.
   * 
   * 
   * @param val
   */
  _3thr(val) {
    this.__3thr = val;
    return this;
  }

  /**
   * Set banding detection threshold for each plane. Default is 0.02.
   * Valid range is 0.00003 to 0.5.
   * If difference between current pixel and reference pixel is less than threshold,
   * it will be considered as banded.
   * 
   * 
   * @param val
   */
  _4thr(val) {
    this.__4thr = val;
    return this;
  }

  /**
   * Banding detection range in pixels. Default is 16. If positive, random number
   * in range 0 to set value will be used. If negative, exact absolute value
   * will be used.
   * The range defines square of four pixels around current pixel.
   * 
   * 
   * @param val
   */
  range(val) {
    this._range = val;
    return this;
  }

  /**
   * Set direction in radians from which four pixel will be compared. If positive,
   * random direction from 0 to set direction will be picked. If negative, exact of
   * absolute value will be picked. For example direction 0, -PI or -2*PI radians
   * will pick only pixels on same row and -PI/2 will pick only pixels on same
   * column.
   * 
   * 
   * @param val
   */
  direction(val) {
    this._direction = val;
    return this;
  }

  /**
   * If enabled, current pixel is compared with average value of all four
   * surrounding pixels. The default is enabled. If disabled current pixel is
   * compared with all four surrounding pixels. The pixel is considered banded
   * if only all four differences with surrounding pixels are less than threshold.
   * 
   * 
   * @param val
   */
  blur(val) {
    this._blur = val;
    return this;
  }

  /**
   * If enabled, current pixel is changed if and only if all pixel components are banded,
   * e.g. banding detection threshold is triggered for all color components.
   * The default is disabled.
   * 
   * @param val
   */
  coupling(val) {
    this._coupling = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.__1thr) {
      opt['1thr'] = this.__1thr;
    }
    if (this.__2thr) {
      opt['2thr'] = this.__2thr;
    }
    if (this.__3thr) {
      opt['3thr'] = this.__3thr;
    }
    if (this.__4thr) {
      opt['4thr'] = this.__4thr;
    }
    if (this._range) {
      opt['range'] = this._range;
    }
    if (this._direction) {
      opt['direction'] = this._direction;
    }
    if (this._blur) {
      opt['blur'] = this._blur;
    }
    if (this._coupling) {
      opt['coupling'] = this._coupling;
    }

    addFilter(this.ffmpeg, {
      filter: 'deband',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.deband = deband;
