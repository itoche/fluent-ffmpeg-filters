const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the pullup function.
 *
 *
 * @example
 *  ffmpeg().pullup()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the pullup function.
 */
function pullup(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'pullup', function() {
    return new PullupFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class PullupFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    PullupFilter.prototype.withJl = this.jl;
    PullupFilter.prototype.withJr = this.jr;
    PullupFilter.prototype.withJt = this.jt;
    PullupFilter.prototype.withJb = this.jb;
    PullupFilter.prototype.withSb = this.sb;
    PullupFilter.prototype.withMp = this.mp;
  }

  /**
   * These options set the amount of &quot;junk&quot; to ignore at the left, right, top, and
   * bottom of the image, respectively. Left and right are in units of 8 pixels,
   * while top and bottom are in units of 2 lines.
   * The default is 8 pixels on each side.
   * 
   * 
   * @param val
   */
  jl(val) {
    this._jl = val;
    return this;
  }

  /**
   * These options set the amount of &quot;junk&quot; to ignore at the left, right, top, and
   * bottom of the image, respectively. Left and right are in units of 8 pixels,
   * while top and bottom are in units of 2 lines.
   * The default is 8 pixels on each side.
   * 
   * 
   * @param val
   */
  jr(val) {
    this._jr = val;
    return this;
  }

  /**
   * These options set the amount of &quot;junk&quot; to ignore at the left, right, top, and
   * bottom of the image, respectively. Left and right are in units of 8 pixels,
   * while top and bottom are in units of 2 lines.
   * The default is 8 pixels on each side.
   * 
   * 
   * @param val
   */
  jt(val) {
    this._jt = val;
    return this;
  }

  /**
   * These options set the amount of &quot;junk&quot; to ignore at the left, right, top, and
   * bottom of the image, respectively. Left and right are in units of 8 pixels,
   * while top and bottom are in units of 2 lines.
   * The default is 8 pixels on each side.
   * 
   * 
   * @param val
   */
  jb(val) {
    this._jb = val;
    return this;
  }

  /**
   * Set the strict breaks. Setting this option to 1 will reduce the chances of
   * filter generating an occasional mismatched frame, but it may also cause an
   * excessive number of frames to be dropped during high motion sequences.
   * Conversely, setting it to -1 will make filter match fields more easily.
   * This may help processing of video where there is slight blurring between
   * the fields, but may also cause there to be interlaced frames in the output.
   * Default value is 0.
   * 
   * 
   * @param val
   */
  sb(val) {
    this._sb = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mp(val) {
    this._mp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._jl) {
      opt['jl'] = this._jl;
    }
    if (this._jr) {
      opt['jr'] = this._jr;
    }
    if (this._jt) {
      opt['jt'] = this._jt;
    }
    if (this._jb) {
      opt['jb'] = this._jb;
    }
    if (this._sb) {
      opt['sb'] = this._sb;
    }
    if (this._mp) {
      opt['mp'] = this._mp;
    }

    addFilter(this.ffmpeg, {
      filter: 'pullup',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.pullup = pullup;
