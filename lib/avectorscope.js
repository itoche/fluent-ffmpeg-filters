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
    Avectorscope.prototype.withMode = mode;
    Avectorscope.prototype.withSize = size;
    Avectorscope.prototype.withRate = rate;
    Avectorscope.prototype.withAc = ac;
    Avectorscope.prototype.withAf = af;
    Avectorscope.prototype.withZoom = zoom;
    Avectorscope.prototype.withDraw = draw;
    Avectorscope.prototype.withScale = scale;
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
   * Set the video size for the output. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Default value is 400x400.
   * 
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }

  /**
   * Set the output frame rate. Default value is 25.
   * 
   * 
   * @param val
   */
  rate(val) {
    this.rate = val;
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
    this.ac = val;
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
    this.af = val;
    return this;
  }

  /**
   * Set the zoom factor. Default value is 1. Allowed range is [1, 10].
   * 
   * 
   * @param val
   */
  zoom(val) {
    this.zoom = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  draw(val) {
    this.draw = val;
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
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.size) {
      opt['size'] = this.size;
    }
    if (this.rate) {
      opt['rate'] = this.rate;
    }
    if (this.ac) {
      opt['ac'] = this.ac;
    }
    if (this.af) {
      opt['af'] = this.af;
    }
    if (this.zoom) {
      opt['zoom'] = this.zoom;
    }
    if (this.draw) {
      opt['draw'] = this.draw;
    }
    if (this.scale) {
      opt['scale'] = this.scale;
    }

    addFilter(this.ffmpeg, {
      filter: 'avectorscope',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.avectorscope = avectorscope;
