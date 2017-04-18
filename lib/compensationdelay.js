const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the compensationdelay function.
 *
 *
 * @example
 *  ffmpeg().compensationdelay()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the compensationdelay function.
 */
function compensationdelay(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'compensationdelay', function() {
    return new CompensationdelayFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class CompensationdelayFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    CompensationdelayFilter.prototype.withMm = this.mm;
    CompensationdelayFilter.prototype.withCm = this.cm;
    CompensationdelayFilter.prototype.withM = this.m;
    CompensationdelayFilter.prototype.withDry = this.dry;
    CompensationdelayFilter.prototype.withWet = this.wet;
    CompensationdelayFilter.prototype.withTemp = this.temp;
  }

  /**
   * Set millimeters distance. This is compensation distance for fine tuning.
   * Default is 0.
   * 
   * 
   * @param val
   */
  mm(val) {
    this._mm = val;
    return this;
  }

  /**
   * Set cm distance. This is compensation distance for tightening distance setup.
   * Default is 0.
   * 
   * 
   * @param val
   */
  cm(val) {
    this._cm = val;
    return this;
  }

  /**
   * Set meters distance. This is compensation distance for hard distance setup.
   * Default is 0.
   * 
   * 
   * @param val
   */
  m(val) {
    this._m = val;
    return this;
  }

  /**
   * Set dry amount. Amount of unprocessed (dry) signal.
   * Default is 0.
   * 
   * 
   * @param val
   */
  dry(val) {
    this._dry = val;
    return this;
  }

  /**
   * Set wet amount. Amount of processed (wet) signal.
   * Default is 1.
   * 
   * 
   * @param val
   */
  wet(val) {
    this._wet = val;
    return this;
  }

  /**
   * Set temperature degree in Celsius. This is the temperature of the environment.
   * Default is 20.
   * 
   * @param val
   */
  temp(val) {
    this._temp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._mm) {
      opt['mm'] = this._mm;
    }
    if (this._cm) {
      opt['cm'] = this._cm;
    }
    if (this._m) {
      opt['m'] = this._m;
    }
    if (this._dry) {
      opt['dry'] = this._dry;
    }
    if (this._wet) {
      opt['wet'] = this._wet;
    }
    if (this._temp) {
      opt['temp'] = this._temp;
    }

    addFilter(this.ffmpeg, {
      filter: 'compensationdelay',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.compensationdelay = compensationdelay;
