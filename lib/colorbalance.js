const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the colorbalance function.
 *
 *
 * @example
 *  ffmpeg().colorbalance()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the colorbalance function.
 */
function colorbalance(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'colorbalance', function() {
    return new ColorbalanceFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ColorbalanceFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ColorbalanceFilter.prototype.withRs = this.rs;
    ColorbalanceFilter.prototype.withGs = this.gs;
    ColorbalanceFilter.prototype.withBs = this.bs;
    ColorbalanceFilter.prototype.withRm = this.rm;
    ColorbalanceFilter.prototype.withGm = this.gm;
    ColorbalanceFilter.prototype.withBm = this.bm;
    ColorbalanceFilter.prototype.withRh = this.rh;
    ColorbalanceFilter.prototype.withGh = this.gh;
    ColorbalanceFilter.prototype.withBh = this.bh;
  }

  /**
   * Adjust red, green and blue shadows (darkest pixels).
   * 
   * 
   * @param val
   */
  rs(val) {
    this._rs = val;
    return this;
  }

  /**
   * Adjust red, green and blue shadows (darkest pixels).
   * 
   * 
   * @param val
   */
  gs(val) {
    this._gs = val;
    return this;
  }

  /**
   * Adjust red, green and blue shadows (darkest pixels).
   * 
   * 
   * @param val
   */
  bs(val) {
    this._bs = val;
    return this;
  }

  /**
   * Adjust red, green and blue midtones (medium pixels).
   * 
   * 
   * @param val
   */
  rm(val) {
    this._rm = val;
    return this;
  }

  /**
   * Adjust red, green and blue midtones (medium pixels).
   * 
   * 
   * @param val
   */
  gm(val) {
    this._gm = val;
    return this;
  }

  /**
   * Adjust red, green and blue midtones (medium pixels).
   * 
   * 
   * @param val
   */
  bm(val) {
    this._bm = val;
    return this;
  }

  /**
   * Adjust red, green and blue highlights (brightest pixels).
   * 
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 0.
   * 
   * @param val
   */
  rh(val) {
    this._rh = val;
    return this;
  }

  /**
   * Adjust red, green and blue highlights (brightest pixels).
   * 
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 0.
   * 
   * @param val
   */
  gh(val) {
    this._gh = val;
    return this;
  }

  /**
   * Adjust red, green and blue highlights (brightest pixels).
   * 
   * Allowed ranges for options are [-1.0, 1.0]. Defaults are 0.
   * 
   * @param val
   */
  bh(val) {
    this._bh = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._rs) {
      opt['rs'] = this._rs;
    }
    if (this._gs) {
      opt['gs'] = this._gs;
    }
    if (this._bs) {
      opt['bs'] = this._bs;
    }
    if (this._rm) {
      opt['rm'] = this._rm;
    }
    if (this._gm) {
      opt['gm'] = this._gm;
    }
    if (this._bm) {
      opt['bm'] = this._bm;
    }
    if (this._rh) {
      opt['rh'] = this._rh;
    }
    if (this._gh) {
      opt['gh'] = this._gh;
    }
    if (this._bh) {
      opt['bh'] = this._bh;
    }

    addFilter(this.ffmpeg, {
      filter: 'colorbalance',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.colorbalance = colorbalance;
