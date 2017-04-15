const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the colorchannelmixer function.
 *
 *
 * @example
 *  ffmpeg().colorchannelmixer()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the colorchannelmixer function.
 */
function colorchannelmixer(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'colorchannelmixer', function() {
    return new ColorchannelmixerFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ColorchannelmixerFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Colorchannelmixer.prototype.withRa = ra;
    Colorchannelmixer.prototype.withGa = ga;
    Colorchannelmixer.prototype.withBa = ba;
    Colorchannelmixer.prototype.withAa = aa;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output red channel.
   * Default is 1 for rr, and 0 for rg, rb and ra.
   * 
   * 
   * @param val
   */
  ra(val) {
    this.ra = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output green channel.
   * Default is 1 for gg, and 0 for gr, gb and ga.
   * 
   * 
   * @param val
   */
  ga(val) {
    this.ga = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output blue channel.
   * Default is 1 for bb, and 0 for br, bg and ba.
   * 
   * 
   * @param val
   */
  ba(val) {
    this.ba = val;
    return this;
  }

  /**
   * Adjust contribution of input red, green, blue and alpha channels for output alpha channel.
   * Default is 1 for aa, and 0 for ar, ag and ab.
   * 
   * Allowed ranges for options are [-2.0, 2.0].
   * 
   * @param val
   */
  aa(val) {
    this.aa = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.ra) {
      opt['ra'] = this.ra;
    }
    if (this.ga) {
      opt['ga'] = this.ga;
    }
    if (this.ba) {
      opt['ba'] = this.ba;
    }
    if (this.aa) {
      opt['aa'] = this.aa;
    }

    addFilter(this.ffmpeg, {
      filter: 'colorchannelmixer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.colorchannelmixer = colorchannelmixer;
