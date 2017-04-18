const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the ahistogram function.
 *
 *
 * @example
 *  ffmpeg().ahistogram()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the ahistogram function.
 */
function ahistogram(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'ahistogram', function() {
    return new AhistogramFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AhistogramFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AhistogramFilter.prototype.withDmode = this.dmode;
    AhistogramFilter.prototype.withRate = this.rate;
    AhistogramFilter.prototype.withSize = this.size;
    AhistogramFilter.prototype.withScale = this.scale;
    AhistogramFilter.prototype.withAscale = this.ascale;
    AhistogramFilter.prototype.withAcount = this.acount;
    AhistogramFilter.prototype.withRheight = this.rheight;
    AhistogramFilter.prototype.withSlide = this.slide;
  }

  /**
   * 
   * @param val
   */
  dmode(val) {
    this._dmode = val;
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
   * Specify the video size for the output. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Default value is hd720.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
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
   * 
   * @param val
   */
  ascale(val) {
    this._ascale = val;
    return this;
  }

  /**
   * Set how much frames to accumulate in histogram.
   * Defauls is 1. Setting this to -1 accumulates all frames.
   * 
   * 
   * @param val
   */
  acount(val) {
    this._acount = val;
    return this;
  }

  /**
   * Set histogram ratio of window height.
   * 
   * 
   * @param val
   */
  rheight(val) {
    this._rheight = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  slide(val) {
    this._slide = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._dmode) {
      opt['dmode'] = this._dmode;
    }
    if (this._rate) {
      opt['rate'] = this._rate;
    }
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._scale) {
      opt['scale'] = this._scale;
    }
    if (this._ascale) {
      opt['ascale'] = this._ascale;
    }
    if (this._acount) {
      opt['acount'] = this._acount;
    }
    if (this._rheight) {
      opt['rheight'] = this._rheight;
    }
    if (this._slide) {
      opt['slide'] = this._slide;
    }

    addFilter(this.ffmpeg, {
      filter: 'ahistogram',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ahistogram = ahistogram;
