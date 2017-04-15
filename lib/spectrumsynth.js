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
    SpectrumsynthFilter.prototype.withSample_rate = sample_rate;
    SpectrumsynthFilter.prototype.withChannels = channels;
    SpectrumsynthFilter.prototype.withScale = scale;
    SpectrumsynthFilter.prototype.withSlide = slide;
    SpectrumsynthFilter.prototype.withWin_func = win_func;
    SpectrumsynthFilter.prototype.withOverlap = overlap;
    SpectrumsynthFilter.prototype.withOrientation = orientation;
  }

  /**
   * Specify sample rate of output audio, the sample rate of audio from which
   * spectrum was generated may differ.
   * 
   * 
   * @param val
   */
  sample_rate(val) {
    this.sample_rate = val;
    return this;
  }

  /**
   * Set number of channels represented in input video spectrums.
   * 
   * 
   * @param val
   */
  channels(val) {
    this.channels = val;
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
    this.scale = val;
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
    this.slide = val;
    return this;
  }

  /**
   * Set window function used for resynthesis.
   * 
   * 
   * @param val
   */
  win_func(val) {
    this.win_func = val;
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
    this.overlap = val;
    return this;
  }

  /**
   * Set orientation of input videos. Can be vertical or horizontal.
   * Default is vertical.
   * 
   * @param val
   */
  orientation(val) {
    this.orientation = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.sample_rate) {
      opt['sample_rate'] = this.sample_rate;
    }
    if (this.channels) {
      opt['channels'] = this.channels;
    }
    if (this.scale) {
      opt['scale'] = this.scale;
    }
    if (this.slide) {
      opt['slide'] = this.slide;
    }
    if (this.win_func) {
      opt['win_func'] = this.win_func;
    }
    if (this.overlap) {
      opt['overlap'] = this.overlap;
    }
    if (this.orientation) {
      opt['orientation'] = this.orientation;
    }

    addFilter(this.ffmpeg, {
      filter: 'spectrumsynth',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.spectrumsynth = spectrumsynth;
