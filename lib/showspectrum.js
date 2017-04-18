const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showspectrum function.
 *
 *
 * @example
 *  ffmpeg().showspectrum()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the showspectrum function.
 */
function showspectrum(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'showspectrum', function() {
    return new ShowspectrumFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ShowspectrumFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    ShowspectrumFilter.prototype.withSize = this.size;
    ShowspectrumFilter.prototype.withSlide = this.slide;
    ShowspectrumFilter.prototype.withMode = this.mode;
    ShowspectrumFilter.prototype.withColor = this.color;
    ShowspectrumFilter.prototype.withScale = this.scale;
    ShowspectrumFilter.prototype.withSaturation = this.saturation;
    ShowspectrumFilter.prototype.withWin_func = this.win_func;
    ShowspectrumFilter.prototype.withOrientation = this.orientation;
    ShowspectrumFilter.prototype.withOverlap = this.overlap;
    ShowspectrumFilter.prototype.withGain = this.gain;
    ShowspectrumFilter.prototype.withData = this.data;
    ShowspectrumFilter.prototype.withRotation = this.rotation;
  }

  /**
   * Specify the video size for the output. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Default value is 640x512.
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
  slide(val) {
    this._slide = val;
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
   * Set ratio of overlap window. Default value is 0.
   * When value is 1 overlap is set to recommended size for specific
   * window function currently used.
   * 
   * 
   * @param val
   */
  overlap(val) {
    this._overlap = val;
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
   * Set which data to display. Can be magnitude, default or phase.
   * 
   * 
   * @param val
   */
  data(val) {
    this._data = val;
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
    if (this._slide) {
      opt['slide'] = this._slide;
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
    if (this._overlap) {
      opt['overlap'] = this._overlap;
    }
    if (this._gain) {
      opt['gain'] = this._gain;
    }
    if (this._data) {
      opt['data'] = this._data;
    }
    if (this._rotation) {
      opt['rotation'] = this._rotation;
    }

    addFilter(this.ffmpeg, {
      filter: 'showspectrum',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showspectrum = showspectrum;
