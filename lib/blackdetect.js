const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the blackdetect function.
 *
 *
 * @example
 *  ffmpeg().blackdetect()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the blackdetect function.
 */
function blackdetect(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'blackdetect', function() {
    return new BlackdetectFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class BlackdetectFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Blackdetect.prototype.withBlack_min_duration = black_min_duration;
    Blackdetect.prototype.withPicture_black_ratio_th = picture_black_ratio_th;
    Blackdetect.prototype.withPixel_black_th = pixel_black_th;
  }

  /**
   * Set the minimum detected black duration expressed in seconds. It must
   * be a non-negative floating point number.
   * 
   * Default value is 2.0.
   * 
   * 
   * @param val
   */
  black_min_duration(val) {
    this.black_min_duration = val;
    return this;
  }

  /**
   * Set the threshold for considering a picture &quot;black&quot;.
   * Express the minimum value for the ratio:
   * 
   * nb_black_pixels / nb_pixels
   * 
   * 
   * for which a picture is considered black.
   * Default value is 0.98.
   * 
   * 
   * @param val
   */
  picture_black_ratio_th(val) {
    this.picture_black_ratio_th = val;
    return this;
  }

  /**
   * Set the threshold for considering a pixel &quot;black&quot;.
   * 
   * The threshold expresses the maximum pixel luminance value for which a
   * pixel is considered &quot;black&quot;. The provided value is scaled according to
   * the following equation:
   * 
   * absolute_threshold &#x3D; luminance_minimum_value + pixel_black_th * luminance_range_size
   * 
   * 
   * luminance_range_size and luminance_minimum_value depend on
   * the input video format, the range is [0-255] for YUV full-range
   * formats and [16-235] for YUV non full-range formats.
   * 
   * Default value is 0.10.
   * 
   * @param val
   */
  pixel_black_th(val) {
    this.pixel_black_th = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.black_min_duration) {
      opt['black_min_duration'] = this.black_min_duration;
    }
    if (this.picture_black_ratio_th) {
      opt['picture_black_ratio_th'] = this.picture_black_ratio_th;
    }
    if (this.pixel_black_th) {
      opt['pixel_black_th'] = this.pixel_black_th;
    }

    addFilter(this.ffmpeg, {
      filter: 'blackdetect',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.blackdetect = blackdetect;
