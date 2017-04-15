const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the crop function.
 *
 *
 * @example
 *  ffmpeg().crop()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the crop function.
 */
function crop(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'crop', function() {
    return new CropFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class CropFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    CropFilter.prototype.withW = w;
    CropFilter.prototype.withH = h;
    CropFilter.prototype.withX = x;
    CropFilter.prototype.withY = y;
    CropFilter.prototype.withKeep_aspect = keep_aspect;
    CropFilter.prototype.withExact = exact;
  }

  /**
   * The width of the output video. It defaults to iw.
   * This expression is evaluated only once during the filter
   * configuration, or when the ‘w’ or ‘out_w’ command is sent.
   * 
   * 
   * @param val
   */
  w(val) {
    this.w = val;
    return this;
  }

  /**
   * The height of the output video. It defaults to ih.
   * This expression is evaluated only once during the filter
   * configuration, or when the ‘h’ or ‘out_h’ command is sent.
   * 
   * 
   * @param val
   */
  h(val) {
    this.h = val;
    return this;
  }

  /**
   * The horizontal position, in the input video, of the left edge of the output
   * video. It defaults to (in_w-out_w)/2.
   * This expression is evaluated per-frame.
   * 
   * 
   * @param val
   */
  x(val) {
    this.x = val;
    return this;
  }

  /**
   * The vertical position, in the input video, of the top edge of the output video.
   * It defaults to (in_h-out_h)/2.
   * This expression is evaluated per-frame.
   * 
   * 
   * @param val
   */
  y(val) {
    this.y = val;
    return this;
  }

  /**
   * If set to 1 will force the output display aspect ratio
   * to be the same of the input, by changing the output sample aspect
   * ratio. It defaults to 0.
   * 
   * 
   * @param val
   */
  keep_aspect(val) {
    this.keep_aspect = val;
    return this;
  }

  /**
   * Enable exact cropping. If enabled, subsampled videos will be cropped at exact
   * width/height/x/y as specified and will not be rounded to nearest smaller value.
   * It defaults to 0.
   * 
   * @param val
   */
  exact(val) {
    this.exact = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.w) {
      opt['w'] = this.w;
    }
    if (this.h) {
      opt['h'] = this.h;
    }
    if (this.x) {
      opt['x'] = this.x;
    }
    if (this.y) {
      opt['y'] = this.y;
    }
    if (this.keep_aspect) {
      opt['keep_aspect'] = this.keep_aspect;
    }
    if (this.exact) {
      opt['exact'] = this.exact;
    }

    addFilter(this.ffmpeg, {
      filter: 'crop',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.crop = crop;
