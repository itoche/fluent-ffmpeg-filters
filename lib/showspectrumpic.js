const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showspectrumpic function.
 *
 *
 * @example
 *  ffmpeg().showspectrumpic()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the showspectrumpic function.
 */
function showspectrumpic(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'showspectrumpic', function() {
    return new ShowspectrumpicFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ShowspectrumpicFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Showspectrumpic.prototype.withSize = size;
    Showspectrumpic.prototype.withMode = mode;
    Showspectrumpic.prototype.withColor = color;
    Showspectrumpic.prototype.withScale = scale;
    Showspectrumpic.prototype.withSaturation = saturation;
    Showspectrumpic.prototype.withWin_func = win_func;
    Showspectrumpic.prototype.withOrientation = orientation;
    Showspectrumpic.prototype.withGain = gain;
    Showspectrumpic.prototype.withLegend = legend;
    Showspectrumpic.prototype.withRotation = rotation;
  }

  /**
   * Specify the video size for the output. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Default value is 4096x2048.
   * 
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this.mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  color(val) {
    this.color = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  scale(val) {
    this.scale = val;
    return this;
  }

  /**
   * Set saturation modifier for displayed colors. Negative values provide
   * alternative color scheme. 0 is no saturation at all.
   * Saturation must be in [-10.0, 10.0] range.
   * Default value is 1.
   * 
   * 
   * @param val
   */
  saturation(val) {
    this.saturation = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  win_func(val) {
    this.win_func = val;
    return this;
  }

  /**
   * Set orientation of time vs frequency axis. Can be vertical or
   * horizontal. Default is vertical.
   * 
   * 
   * @param val
   */
  orientation(val) {
    this.orientation = val;
    return this;
  }

  /**
   * Set scale gain for calculating intensity color values.
   * Default value is 1.
   * 
   * 
   * @param val
   */
  gain(val) {
    this.gain = val;
    return this;
  }

  /**
   * Draw time and frequency axes and legends. Default is enabled.
   * 
   * 
   * @param val
   */
  legend(val) {
    this.legend = val;
    return this;
  }

  /**
   * Set color rotation, must be in [-1.0, 1.0] range.
   * Default value is 0.
   * 
   * @param val
   */
  rotation(val) {
    this.rotation = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.size) {
      opt.size = this.size;
    }
    if (this.mode) {
      opt.mode = this.mode;
    }
    if (this.color) {
      opt.color = this.color;
    }
    if (this.scale) {
      opt.scale = this.scale;
    }
    if (this.saturation) {
      opt.saturation = this.saturation;
    }
    if (this.win_func) {
      opt.win_func = this.win_func;
    }
    if (this.orientation) {
      opt.orientation = this.orientation;
    }
    if (this.gain) {
      opt.gain = this.gain;
    }
    if (this.legend) {
      opt.legend = this.legend;
    }
    if (this.rotation) {
      opt.rotation = this.rotation;
    }

    addFilter(this.ffmpeg, {
      filter: 'showspectrumpic',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showspectrumpic = showspectrumpic;
