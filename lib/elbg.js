const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the elbg function.
 *
 *
 * @example
 *  ffmpeg().elbg()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the elbg function.
 */
function elbg(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'elbg', function() {
    return new ElbgFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ElbgFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ElbgFilter.prototype.withCodebook_length = this.codebook_length;
    ElbgFilter.prototype.withNb_steps = this.nb_steps;
    ElbgFilter.prototype.withSeed = this.seed;
    ElbgFilter.prototype.withPal8 = this.pal8;
  }

  /**
   * Set codebook length. The value must be a positive integer, and
   * represents the number of distinct output colors. Default value is 256.
   * 
   * 
   * @param val
   */
  codebook_length(val) {
    this._codebook_length = val;
    return this;
  }

  /**
   * Set the maximum number of iterations to apply for computing the optimal
   * mapping. The higher the value the better the result and the higher the
   * computation time. Default value is 1.
   * 
   * 
   * @param val
   */
  nb_steps(val) {
    this._nb_steps = val;
    return this;
  }

  /**
   * Set a random seed, must be an integer included between 0 and
   * UINT32_MAX. If not specified, or if explicitly set to -1, the filter
   * will try to use a good random seed on a best effort basis.
   * 
   * 
   * @param val
   */
  seed(val) {
    this._seed = val;
    return this;
  }

  /**
   * Set pal8 output pixel format. This option does not work with codebook
   * length greater than 256.
   * 
   * @param val
   */
  pal8(val) {
    this._pal8 = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._codebook_length) {
      opt['codebook_length'] = this._codebook_length;
    }
    if (this._nb_steps) {
      opt['nb_steps'] = this._nb_steps;
    }
    if (this._seed) {
      opt['seed'] = this._seed;
    }
    if (this._pal8) {
      opt['pal8'] = this._pal8;
    }

    addFilter(this.ffmpeg, {
      filter: 'elbg',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.elbg = elbg;
