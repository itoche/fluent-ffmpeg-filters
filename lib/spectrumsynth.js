const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the spectrumsynth function.
 *
 *
 * @example
 *  ffmpeg().spectrumsynth()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the spectrumsynth function.
 */
function spectrumsynth(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'spectrumsynth', function() {
    return new SpectrumsynthFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SpectrumsynthFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SpectrumsynthFilter.prototype.withSample_rate = this.sample_rate;
    SpectrumsynthFilter.prototype.withChannels = this.channels;
    SpectrumsynthFilter.prototype.withScale = this.scale;
    SpectrumsynthFilter.prototype.withSlide = this.slide;
    SpectrumsynthFilter.prototype.withWin_func = this.win_func;
    SpectrumsynthFilter.prototype.withOverlap = this.overlap;
    SpectrumsynthFilter.prototype.withOrientation = this.orientation;
  }

  /**
   * Specify sample rate of output audio, the sample rate of audio from which
   * spectrum was generated may differ.
   * 
   * 
   * @param val
   */
  sample_rate(val) {
    this._sample_rate = val;
    return this;
  }

  /**
   * Set number of channels represented in input video spectrums.
   * 
   * 
   * @param val
   */
  channels(val) {
    this._channels = val;
    return this;
  }

  /**
   * Set scale which was used when generating magnitude input spectrum.
   * Can be lin or log. Default is log.
   * 
   * 
   * @param val
   */
  scale(val) {
    this._scale = val;
    return this;
  }

  /**
   * Set slide which was used when generating inputs spectrums.
   * Can be replace, scroll, fullframe or rscroll.
   * Default is fullframe.
   * 
   * 
   * @param val
   */
  slide(val) {
    this._slide = val;
    return this;
  }

  /**
   * Set window function used for resynthesis.
   * 
   * 
   * @param val
   */
  win_func(val) {
    this._win_func = val;
    return this;
  }

  /**
   * Set window overlap. In range [0, 1]. Default is 1,
   * which means optimal overlap for selected window function will be picked.
   * 
   * 
   * @param val
   */
  overlap(val) {
    this._overlap = val;
    return this;
  }

  /**
   * Set orientation of input videos. Can be vertical or horizontal.
   * Default is vertical.
   * 
   * @param val
   */
  orientation(val) {
    this._orientation = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._sample_rate) {
      opt['sample_rate'] = this._sample_rate;
    }
    if (this._channels) {
      opt['channels'] = this._channels;
    }
    if (this._scale) {
      opt['scale'] = this._scale;
    }
    if (this._slide) {
      opt['slide'] = this._slide;
    }
    if (this._win_func) {
      opt['win_func'] = this._win_func;
    }
    if (this._overlap) {
      opt['overlap'] = this._overlap;
    }
    if (this._orientation) {
      opt['orientation'] = this._orientation;
    }

    addFilter(this.ffmpeg, {
      filter: 'spectrumsynth',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.spectrumsynth = spectrumsynth;
