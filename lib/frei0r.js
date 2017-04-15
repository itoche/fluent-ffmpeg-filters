const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the frei0r function.
 *
 *
 * @example
 *  ffmpeg().frei0r()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the frei0r function.
 */
function frei0r(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'frei0r', function() {
    return new Frei0rFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Frei0rFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Frei0r.prototype.withFilter_name = filter_name;
    Frei0r.prototype.withFilter_params = filter_params;
  }

  /**
   * The name of the frei0r effect to load. If the environment variable
   * FREI0R_PATH is defined, the frei0r effect is searched for in each of the
   * directories specified by the colon-separated list in FREIOR_PATH.
   * Otherwise, the standard frei0r paths are searched, in this order:
   * HOME/.frei0r-1/lib/, /usr/local/lib/frei0r-1/,
   * /usr/lib/frei0r-1/.
   * 
   * 
   * @param val
   */
  filter_name(val) {
    this.filter_name = val;
    return this;
  }

  /**
   * A ’|’-separated list of parameters to pass to the frei0r effect.
   * 
   * 
   * @param val
   */
  filter_params(val) {
    this.filter_params = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.filter_name) {
      opt['filter_name'] = this.filter_name;
    }
    if (this.filter_params) {
      opt['filter_params'] = this.filter_params;
    }

    addFilter(this.ffmpeg, {
      filter: 'frei0r',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.frei0r = frei0r;
