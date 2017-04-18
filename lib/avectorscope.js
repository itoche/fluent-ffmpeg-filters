const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the avectorscope function.
 *
 *
 * @example
 *  ffmpeg().avectorscope()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the avectorscope function.
 */
function avectorscope(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'avectorscope', function() {
    return new AvectorscopeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AvectorscopeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AvectorscopeFilter.prototype.withMode = this.mode;
    AvectorscopeFilter.prototype.withSize = this.size;
    AvectorscopeFilter.prototype.withRate = this.rate;
    AvectorscopeFilter.prototype.withRc = this.rc;
    AvectorscopeFilter.prototype.withGc = this.gc;
    AvectorscopeFilter.prototype.withBc = this.bc;
    AvectorscopeFilter.prototype.withAc = this.ac;
    AvectorscopeFilter.prototype.withRf = this.rf;
    AvectorscopeFilter.prototype.withGf = this.gf;
    AvectorscopeFilter.prototype.withBf = this.bf;
    AvectorscopeFilter.prototype.withAf = this.af;
    AvectorscopeFilter.prototype.withZoom = this.zoom;
    AvectorscopeFilter.prototype.withDraw = this.draw;
    AvectorscopeFilter.prototype.withScale = this.scale;
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
   * Set the video size for the output. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Default value is 400x400.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
    return this;
  }

  /**
   * Set the output frame rate. Default value is 25.
   * 
   * 
   * @param val
   */
  rate(val) {
    this._rate = val;
    return this;
  }

  /**
   * Specify the red, green, blue and alpha contrast. Default values are 40,
   * 160, 80 and 255.
   * Allowed range is [0, 255].
   * 
   * 
   * @param val
   */
  rc(val) {
    this._rc = val;
    return this;
  }

  /**
   * Specify the red, green, blue and alpha contrast. Default values are 40,
   * 160, 80 and 255.
   * Allowed range is [0, 255].
   * 
   * 
   * @param val
   */
  gc(val) {
    this._gc = val;
    return this;
  }

  /**
   * Specify the red, green, blue and alpha contrast. Default values are 40,
   * 160, 80 and 255.
   * Allowed range is [0, 255].
   * 
   * 
   * @param val
   */
  bc(val) {
    this._bc = val;
    return this;
  }

  /**
   * Specify the red, green, blue and alpha contrast. Default values are 40,
   * 160, 80 and 255.
   * Allowed range is [0, 255].
   * 
   * 
   * @param val
   */
  ac(val) {
    this._ac = val;
    return this;
  }

  /**
   * Specify the red, green, blue and alpha fade. Default values are 15,
   * 10, 5 and 5.
   * Allowed range is [0, 255].
   * 
   * 
   * @param val
   */
  rf(val) {
    this._rf = val;
    return this;
  }

  /**
   * Specify the red, green, blue and alpha fade. Default values are 15,
   * 10, 5 and 5.
   * Allowed range is [0, 255].
   * 
   * 
   * @param val
   */
  gf(val) {
    this._gf = val;
    return this;
  }

  /**
   * Specify the red, green, blue and alpha fade. Default values are 15,
   * 10, 5 and 5.
   * Allowed range is [0, 255].
   * 
   * 
   * @param val
   */
  bf(val) {
    this._bf = val;
    return this;
  }

  /**
   * Specify the red, green, blue and alpha fade. Default values are 15,
   * 10, 5 and 5.
   * Allowed range is [0, 255].
   * 
   * 
   * @param val
   */
  af(val) {
    this._af = val;
    return this;
  }

  /**
   * Set the zoom factor. Default value is 1. Allowed range is [1, 10].
   * 
   * 
   * @param val
   */
  zoom(val) {
    this._zoom = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  draw(val) {
    this._draw = val;
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
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._rate) {
      opt['rate'] = this._rate;
    }
    if (this._rc) {
      opt['rc'] = this._rc;
    }
    if (this._gc) {
      opt['gc'] = this._gc;
    }
    if (this._bc) {
      opt['bc'] = this._bc;
    }
    if (this._ac) {
      opt['ac'] = this._ac;
    }
    if (this._rf) {
      opt['rf'] = this._rf;
    }
    if (this._gf) {
      opt['gf'] = this._gf;
    }
    if (this._bf) {
      opt['bf'] = this._bf;
    }
    if (this._af) {
      opt['af'] = this._af;
    }
    if (this._zoom) {
      opt['zoom'] = this._zoom;
    }
    if (this._draw) {
      opt['draw'] = this._draw;
    }
    if (this._scale) {
      opt['scale'] = this._scale;
    }

    addFilter(this.ffmpeg, {
      filter: 'avectorscope',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.avectorscope = avectorscope;
