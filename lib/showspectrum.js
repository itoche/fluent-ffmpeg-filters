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
    Showspectrum.prototype.withSize = size;
    Showspectrum.prototype.withSlide = slide;
    Showspectrum.prototype.withMode = mode;
    Showspectrum.prototype.withColor = color;
    Showspectrum.prototype.withScale = scale;
    Showspectrum.prototype.withSaturation = saturation;
    Showspectrum.prototype.withWin_func = win_func;
    Showspectrum.prototype.withOrientation = orientation;
    Showspectrum.prototype.withOverlap = overlap;
    Showspectrum.prototype.withGain = gain;
    Showspectrum.prototype.withData = data;
    Showspectrum.prototype.withRotation = rotation;
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
    this.size = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  slide(val) {
    this.slide = val;
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
   * Set ratio of overlap window. Default value is 0.
   * When value is 1 overlap is set to recommended size for specific
   * window function currently used.
   * 
   * 
   * @param val
   */
  overlap(val) {
    this.overlap = val;
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
   * Set which data to display. Can be magnitude, default or phase.
   * 
   * 
   * @param val
   */
  data(val) {
    this.data = val;
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
      opt['size'] = this.size;
    }
    if (this.slide) {
      opt['slide'] = this.slide;
    }
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.color) {
      opt['color'] = this.color;
    }
    if (this.scale) {
      opt['scale'] = this.scale;
    }
    if (this.saturation) {
      opt['saturation'] = this.saturation;
    }
    if (this.win_func) {
      opt['win_func'] = this.win_func;
    }
    if (this.orientation) {
      opt['orientation'] = this.orientation;
    }
    if (this.overlap) {
      opt['overlap'] = this.overlap;
    }
    if (this.gain) {
      opt['gain'] = this.gain;
    }
    if (this.data) {
      opt['data'] = this.data;
    }
    if (this.rotation) {
      opt['rotation'] = this.rotation;
    }

    addFilter(this.ffmpeg, {
      filter: 'showspectrum',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showspectrum = showspectrum;
