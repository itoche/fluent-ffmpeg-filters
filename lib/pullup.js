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
    Pullup.prototype.withJb = jb;
    Pullup.prototype.withSb = sb;
    Pullup.prototype.withMp = mp;
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
    this.jb = val;
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
    this.sb = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mp(val) {
    this.mp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.jb) {
      opt['jb'] = this.jb;
    }
    if (this.sb) {
      opt['sb'] = this.sb;
    }
    if (this.mp) {
      opt['mp'] = this.mp;
    }

    addFilter(this.ffmpeg, {
      filter: 'pullup',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.pullup = pullup;
