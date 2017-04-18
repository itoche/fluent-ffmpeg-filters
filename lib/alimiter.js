const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the alimiter function.
 *
 *
 * @example
 *  ffmpeg().alimiter()
 *    ...             // call filter configuration functions
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
    AlimiterFilter.prototype.withLevel_in = this.level_in;
    AlimiterFilter.prototype.withLevel_out = this.level_out;
    AlimiterFilter.prototype.withLimit = this.limit;
    AlimiterFilter.prototype.withAttack = this.attack;
    AlimiterFilter.prototype.withRelease = this.release;
    AlimiterFilter.prototype.withAsc = this.asc;
    AlimiterFilter.prototype.withAsc_level = this.asc_level;
    AlimiterFilter.prototype.withLevel = this.level;
  }

  /**
   * Set input gain. Default is 1.
   * 
   * 
   * @param val
   */
  level_in(val) {
    this._level_in = val;
    return this;
  }

  /**
   * Set output gain. Default is 1.
   * 
   * 
   * @param val
   */
  level_out(val) {
    this._level_out = val;
    return this;
  }

  /**
   * Don’t let signals above this level pass the limiter. Default is 1.
   * 
   * 
   * @param val
   */
  limit(val) {
    this._limit = val;
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
    this._attack = val;
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
    this._release = val;
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
    this._asc = val;
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
    this._asc_level = val;
    return this;
  }

  /**
   * Auto level output signal. Default is enabled.
   * This normalizes audio back to 0dB if enabled.
   * 
   * @param val
   */
  level(val) {
    this._level = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._level_in) {
      opt['level_in'] = this._level_in;
    }
    if (this._level_out) {
      opt['level_out'] = this._level_out;
    }
    if (this._limit) {
      opt['limit'] = this._limit;
    }
    if (this._attack) {
      opt['attack'] = this._attack;
    }
    if (this._release) {
      opt['release'] = this._release;
    }
    if (this._asc) {
      opt['asc'] = this._asc;
    }
    if (this._asc_level) {
      opt['asc_level'] = this._asc_level;
    }
    if (this._level) {
      opt['level'] = this._level;
    }

    addFilter(this.ffmpeg, {
      filter: 'alimiter',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.alimiter = alimiter;
