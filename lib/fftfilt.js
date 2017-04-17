const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the fftfilt function.
 *
 *
 * @example
 *  ffmpeg().fftfilt()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the fftfilt function.
 */
function fftfilt(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'fftfilt', function() {
    return new FftfiltFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FftfiltFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    FftfiltFilter.prototype.withDc_Y = this.dc_Y;
    FftfiltFilter.prototype.withDc_U = this.dc_U;
    FftfiltFilter.prototype.withDc_V = this.dc_V;
    FftfiltFilter.prototype.withWeight_Y = this.weight_Y;
    FftfiltFilter.prototype.withWeight_U = this.weight_U;
    FftfiltFilter.prototype.withWeight_V = this.weight_V;
    FftfiltFilter.prototype.withX = this.X;
    FftfiltFilter.prototype.withY = this.Y;
    FftfiltFilter.prototype.withW = this.W;
    FftfiltFilter.prototype.withH = this.H;
  }

  /**
   * Adjust the dc value (gain) of the luma plane of the image. The filter
   * accepts an integer value in range 0 to 1000. The default
   * value is set to 0.
   * 
   * 
   * @param val
   */
  dc_Y(val) {
    this.dc_Y = val;
    return this;
  }

  /**
   * Adjust the dc value (gain) of the 1st chroma plane of the image. The
   * filter accepts an integer value in range 0 to 1000. The
   * default value is set to 0.
   * 
   * 
   * @param val
   */
  dc_U(val) {
    this.dc_U = val;
    return this;
  }

  /**
   * Adjust the dc value (gain) of the 2nd chroma plane of the image. The
   * filter accepts an integer value in range 0 to 1000. The
   * default value is set to 0.
   * 
   * 
   * @param val
   */
  dc_V(val) {
    this.dc_V = val;
    return this;
  }

  /**
   * Set the frequency domain weight expression for the luma plane.
   * 
   * 
   * @param val
   */
  weight_Y(val) {
    this.weight_Y = val;
    return this;
  }

  /**
   * Set the frequency domain weight expression for the 1st chroma plane.
   * 
   * 
   * @param val
   */
  weight_U(val) {
    this.weight_U = val;
    return this;
  }

  /**
   * Set the frequency domain weight expression for the 2nd chroma plane.
   * 
   * The filter accepts the following variables:
   * 
   * @param val
   */
  weight_V(val) {
    this.weight_V = val;
    return this;
  }

  /**
   * The coordinates of the current sample.
   * 
   * 
   * @param val
   */
  Y(val) {
    this.Y = val;
    return this;
  }

  /**
   * The coordinates of the current sample.
   * 
   * 
   * @param val
   */
  Y(val) {
    this.Y = val;
    return this;
  }

  /**
   * The width and height of the image.
   * 
   * @param val
   */
  H(val) {
    this.H = val;
    return this;
  }

  /**
   * The width and height of the image.
   * 
   * @param val
   */
  H(val) {
    this.H = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.dc_Y) {
      opt['dc_Y'] = this.dc_Y;
    }
    if (this.dc_U) {
      opt['dc_U'] = this.dc_U;
    }
    if (this.dc_V) {
      opt['dc_V'] = this.dc_V;
    }
    if (this.weight_Y) {
      opt['weight_Y'] = this.weight_Y;
    }
    if (this.weight_U) {
      opt['weight_U'] = this.weight_U;
    }
    if (this.weight_V) {
      opt['weight_V'] = this.weight_V;
    }
    if (this.X) {
      opt['X'] = this.X;
    }
    if (this.Y) {
      opt['Y'] = this.Y;
    }
    if (this.W) {
      opt['W'] = this.W;
    }
    if (this.H) {
      opt['H'] = this.H;
    }

    addFilter(this.ffmpeg, {
      filter: 'fftfilt',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.fftfilt = fftfilt;
