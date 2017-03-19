const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the alimiter function.
 *
 *
 * @example
 *  ffmpeg().alimiter()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the alimiter function.
 */
function alimiter(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'alimiter', function() {
    return new AlimiterFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AlimiterFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Alimiter.prototype.withLevel_in = level_in;
    Alimiter.prototype.withLevel_out = level_out;
    Alimiter.prototype.withLimit = limit;
    Alimiter.prototype.withAttack = attack;
    Alimiter.prototype.withRelease = release;
    Alimiter.prototype.withAsc = asc;
    Alimiter.prototype.withAsc_level = asc_level;
    Alimiter.prototype.withLevel = level;
  }

  /**
   * Set input gain. Default is 1.
   * 
   * 
   * @param val
   */
  level_in(val) {
    this.level_in = val;
    return this;
  }

  /**
   * Set output gain. Default is 1.
   * 
   * 
   * @param val
   */
  level_out(val) {
    this.level_out = val;
    return this;
  }

  /**
   * Don’t let signals above this level pass the limiter. Default is 1.
   * 
   * 
   * @param val
   */
  limit(val) {
    this.limit = val;
    return this;
  }

  /**
   * The limiter will reach its attenuation level in this amount of time in
   * milliseconds. Default is 5 milliseconds.
   * 
   * 
   * @param val
   */
  attack(val) {
    this.attack = val;
    return this;
  }

  /**
   * Come back from limiting to attenuation 1.0 in this amount of milliseconds.
   * Default is 50 milliseconds.
   * 
   * 
   * @param val
   */
  release(val) {
    this.release = val;
    return this;
  }

  /**
   * When gain reduction is always needed ASC takes care of releasing to an
   * average reduction level rather than reaching a reduction of 0 in the release
   * time.
   * 
   * 
   * @param val
   */
  asc(val) {
    this.asc = val;
    return this;
  }

  /**
   * Select how much the release time is affected by ASC, 0 means nearly no changes
   * in release time while 1 produces higher release times.
   * 
   * 
   * @param val
   */
  asc_level(val) {
    this.asc_level = val;
    return this;
  }

  /**
   * Auto level output signal. Default is enabled.
   * This normalizes audio back to 0dB if enabled.
   * 
   * @param val
   */
  level(val) {
    this.level = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.level_in) {
      opt.level_in = this.level_in;
    }
    if (this.level_out) {
      opt.level_out = this.level_out;
    }
    if (this.limit) {
      opt.limit = this.limit;
    }
    if (this.attack) {
      opt.attack = this.attack;
    }
    if (this.release) {
      opt.release = this.release;
    }
    if (this.asc) {
      opt.asc = this.asc;
    }
    if (this.asc_level) {
      opt.asc_level = this.asc_level;
    }
    if (this.level) {
      opt.level = this.level;
    }

    addFilter(this.ffmpeg, {
      filter: 'alimiter',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.alimiter = alimiter;
