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
    this.mm = val;
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
    this.cm = val;
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
    this.m = val;
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
    this.dry = val;
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
    this.wet = val;
    return this;
  }

  /**
   * Set temperature degree in Celsius. This is the temperature of the environment.
   * Default is 20.
   * 
   * @param val
   */
  temp(val) {
    this.temp = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.mm) {
      opt['mm'] = this.mm;
    }
    if (this.cm) {
      opt['cm'] = this.cm;
    }
    if (this.m) {
      opt['m'] = this.m;
    }
    if (this.dry) {
      opt['dry'] = this.dry;
    }
    if (this.wet) {
      opt['wet'] = this.wet;
    }
    if (this.temp) {
      opt['temp'] = this.temp;
    }

    addFilter(this.ffmpeg, {
      filter: 'compensationdelay',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.compensationdelay = compensationdelay;
