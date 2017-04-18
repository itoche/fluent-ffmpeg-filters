const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the mandelbrot function.
 *
 *
 * @example
 *  ffmpeg().mandelbrot()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the mandelbrot function.
 */
function mandelbrot(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'mandelbrot', function() {
    return new MandelbrotFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class MandelbrotFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    MandelbrotFilter.prototype.withEnd_pts = this.end_pts;
    MandelbrotFilter.prototype.withEnd_scale = this.end_scale;
    MandelbrotFilter.prototype.withInner = this.inner;
    MandelbrotFilter.prototype.withBailout = this.bailout;
    MandelbrotFilter.prototype.withMaxiter = this.maxiter;
    MandelbrotFilter.prototype.withOuter = this.outer;
    MandelbrotFilter.prototype.withRate = this.rate;
    MandelbrotFilter.prototype.withSize = this.size;
    MandelbrotFilter.prototype.withStart_scale = this.start_scale;
    MandelbrotFilter.prototype.withStart_x = this.start_x;
    MandelbrotFilter.prototype.withStart_y = this.start_y;
  }

  /**
   * Set the terminal pts value. Default value is 400.
   * 
   * 
   * @param val
   */
  end_pts(val) {
    this._end_pts = val;
    return this;
  }

  /**
   * Set the terminal scale value.
   * Must be a floating point value. Default value is 0.3.
   * 
   * 
   * @param val
   */
  end_scale(val) {
    this._end_scale = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  inner(val) {
    this._inner = val;
    return this;
  }

  /**
   * Set the bailout value. Default value is 10.0.
   * 
   * 
   * @param val
   */
  bailout(val) {
    this._bailout = val;
    return this;
  }

  /**
   * Set the maximum of iterations performed by the rendering
   * algorithm. Default value is 7189.
   * 
   * 
   * @param val
   */
  maxiter(val) {
    this._maxiter = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  outer(val) {
    this._outer = val;
    return this;
  }

  /**
   * Set frame rate, expressed as number of frames per second. Default
   * value is &quot;25&quot;.
   * 
   * 
   * @param val
   */
  rate(val) {
    this._rate = val;
    return this;
  }

  /**
   * Set frame size. For the syntax of this option, check the &quot;Video
   * size&quot; section in the ffmpeg-utils manual. Default value is &quot;640x480&quot;.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
    return this;
  }

  /**
   * Set the initial scale value. Default value is 3.0.
   * 
   * 
   * @param val
   */
  start_scale(val) {
    this._start_scale = val;
    return this;
  }

  /**
   * Set the initial x position. Must be a floating point value between
   * -100 and 100. Default value is -0.743643887037158704752191506114774.
   * 
   * 
   * @param val
   */
  start_x(val) {
    this._start_x = val;
    return this;
  }

  /**
   * Set the initial y position. Must be a floating point value between
   * -100 and 100. Default value is -0.131825904205311970493132056385139.
   * 
   * @param val
   */
  start_y(val) {
    this._start_y = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._end_pts) {
      opt['end_pts'] = this._end_pts;
    }
    if (this._end_scale) {
      opt['end_scale'] = this._end_scale;
    }
    if (this._inner) {
      opt['inner'] = this._inner;
    }
    if (this._bailout) {
      opt['bailout'] = this._bailout;
    }
    if (this._maxiter) {
      opt['maxiter'] = this._maxiter;
    }
    if (this._outer) {
      opt['outer'] = this._outer;
    }
    if (this._rate) {
      opt['rate'] = this._rate;
    }
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._start_scale) {
      opt['start_scale'] = this._start_scale;
    }
    if (this._start_x) {
      opt['start_x'] = this._start_x;
    }
    if (this._start_y) {
      opt['start_y'] = this._start_y;
    }

    addFilter(this.ffmpeg, {
      filter: 'mandelbrot',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.mandelbrot = mandelbrot;
