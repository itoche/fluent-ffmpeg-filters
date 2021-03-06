const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the frei0r_src function.
 *
 *
 * @example
 *  ffmpeg().frei0r_src()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the frei0r_src function.
 */
function frei0r_src(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'frei0r_src', function() {
    return new Frei0r_srcFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Frei0r_srcFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Frei0r_srcFilter.prototype.withSize = this.size;
    Frei0r_srcFilter.prototype.withFramerate = this.framerate;
    Frei0r_srcFilter.prototype.withFilter_name = this.filter_name;
    Frei0r_srcFilter.prototype.withFilter_params = this.filter_params;
  }

  /**
   * The size of the video to generate. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
    return this;
  }

  /**
   * The framerate of the generated video. It may be a string of the form
   * num/den or a frame rate abbreviation.
   * 
   * 
   * @param val
   */
  framerate(val) {
    this._framerate = val;
    return this;
  }

  /**
   * The name to the frei0r source to load. For more information regarding frei0r and
   * how to set the parameters, read the frei0r section in the video filters
   * documentation.
   * 
   * 
   * @param val
   */
  filter_name(val) {
    this._filter_name = val;
    return this;
  }

  /**
   * A ’|’-separated list of parameters to pass to the frei0r source.
   * 
   * 
   * @param val
   */
  filter_params(val) {
    this._filter_params = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._framerate) {
      opt['framerate'] = this._framerate;
    }
    if (this._filter_name) {
      opt['filter_name'] = this._filter_name;
    }
    if (this._filter_params) {
      opt['filter_params'] = this._filter_params;
    }

    addFilter(this.ffmpeg, {
      filter: 'frei0r_src',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.frei0r_src = frei0r_src;
