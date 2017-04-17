const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the aphasemeter function.
 *
 *
 * @example
 *  ffmpeg().aphasemeter()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the aphasemeter function.
 */
function aphasemeter(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'aphasemeter', function() {
    return new AphasemeterFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AphasemeterFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AphasemeterFilter.prototype.withRate = this.rate;
    AphasemeterFilter.prototype.withSize = this.size;
    AphasemeterFilter.prototype.withRc = this.rc;
    AphasemeterFilter.prototype.withGc = this.gc;
    AphasemeterFilter.prototype.withBc = this.bc;
    AphasemeterFilter.prototype.withMpc = this.mpc;
    AphasemeterFilter.prototype.withVideo = this.video;
  }

  /**
   * Set the output frame rate. Default value is 25.
   * 
   * 
   * @param val
   */
  rate(val) {
    this.rate = val;
    return this;
  }

  /**
   * Set the video size for the output. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Default value is 800x400.
   * 
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }

  /**
   * Specify the red, green, blue contrast. Default values are 2,
   * 7 and 1.
   * Allowed range is [0, 255].
   * 
   * 
   * @param val
   */
  bc(val) {
    this.bc = val;
    return this;
  }

  /**
   * Specify the red, green, blue contrast. Default values are 2,
   * 7 and 1.
   * Allowed range is [0, 255].
   * 
   * 
   * @param val
   */
  bc(val) {
    this.bc = val;
    return this;
  }

  /**
   * Specify the red, green, blue contrast. Default values are 2,
   * 7 and 1.
   * Allowed range is [0, 255].
   * 
   * 
   * @param val
   */
  bc(val) {
    this.bc = val;
    return this;
  }

  /**
   * Set color which will be used for drawing median phase. If color is
   * none which is default, no median phase value will be drawn.
   * 
   * 
   * @param val
   */
  mpc(val) {
    this.mpc = val;
    return this;
  }

  /**
   * Enable video output. Default is enabled.
   * 
   * @param val
   */
  video(val) {
    this.video = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.rate) {
      opt['rate'] = this.rate;
    }
    if (this.size) {
      opt['size'] = this.size;
    }
    if (this.rc) {
      opt['rc'] = this.rc;
    }
    if (this.gc) {
      opt['gc'] = this.gc;
    }
    if (this.bc) {
      opt['bc'] = this.bc;
    }
    if (this.mpc) {
      opt['mpc'] = this.mpc;
    }
    if (this.video) {
      opt['video'] = this.video;
    }

    addFilter(this.ffmpeg, {
      filter: 'aphasemeter',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.aphasemeter = aphasemeter;
