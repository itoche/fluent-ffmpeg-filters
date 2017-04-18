const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showspectrumpic function.
 *
 *
 * @example
 *  ffmpeg().showspectrumpic()
 *    ...             // call filter configuration functions
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
    ShowspectrumpicFilter.prototype.withSize = this.size;
    ShowspectrumpicFilter.prototype.withMode = this.mode;
    ShowspectrumpicFilter.prototype.withColor = this.color;
    ShowspectrumpicFilter.prototype.withScale = this.scale;
    ShowspectrumpicFilter.prototype.withSaturation = this.saturation;
    ShowspectrumpicFilter.prototype.withWin_func = this.win_func;
    ShowspectrumpicFilter.prototype.withOrientation = this.orientation;
    ShowspectrumpicFilter.prototype.withGain = this.gain;
    ShowspectrumpicFilter.prototype.withLegend = this.legend;
    ShowspectrumpicFilter.prototype.withRotation = this.rotation;
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
    this._size = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this._mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  color(val) {
    this._color = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  scale(val) {
    this._scale = val;
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
    this._saturation = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  win_func(val) {
    this._win_func = val;
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
    this._orientation = val;
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
    this._gain = val;
    return this;
  }

  /**
   * Draw time and frequency axes and legends. Default is enabled.
   * 
   * 
   * @param val
   */
  legend(val) {
    this._legend = val;
    return this;
  }

  /**
   * Set color rotation, must be in [-1.0, 1.0] range.
   * Default value is 0.
   * 
   * @param val
   */
  rotation(val) {
    this._rotation = val;
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
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._color) {
      opt['color'] = this._color;
    }
    if (this._scale) {
      opt['scale'] = this._scale;
    }
    if (this._saturation) {
      opt['saturation'] = this._saturation;
    }
    if (this._win_func) {
      opt['win_func'] = this._win_func;
    }
    if (this._orientation) {
      opt['orientation'] = this._orientation;
    }
    if (this._gain) {
      opt['gain'] = this._gain;
    }
    if (this._legend) {
      opt['legend'] = this._legend;
    }
    if (this._rotation) {
      opt['rotation'] = this._rotation;
    }

    addFilter(this.ffmpeg, {
      filter: 'showspectrumpic',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showspectrumpic = showspectrumpic;
