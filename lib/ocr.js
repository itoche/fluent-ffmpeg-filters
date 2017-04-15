const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the ocr function.
 *
 *
 * @example
 *  ffmpeg().ocr()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the ocr function.
 */
function ocr(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'ocr', function() {
    return new OcrFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class OcrFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Ocr.prototype.withDatapath = datapath;
    Ocr.prototype.withLanguage = language;
    Ocr.prototype.withWhitelist = whitelist;
    Ocr.prototype.withBlacklist = blacklist;
  }

  /**
   * Set datapath to tesseract data. Default is to use whatever was
   * set at installation.
   * 
   * 
   * @param val
   */
  datapath(val) {
    this.datapath = val;
    return this;
  }

  /**
   * Set language, default is &quot;eng&quot;.
   * 
   * 
   * @param val
   */
  language(val) {
    this.language = val;
    return this;
  }

  /**
   * Set character whitelist.
   * 
   * 
   * @param val
   */
  whitelist(val) {
    this.whitelist = val;
    return this;
  }

  /**
   * Set character blacklist.
   * 
   * @param val
   */
  blacklist(val) {
    this.blacklist = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.datapath) {
      opt['datapath'] = this.datapath;
    }
    if (this.language) {
      opt['language'] = this.language;
    }
    if (this.whitelist) {
      opt['whitelist'] = this.whitelist;
    }
    if (this.blacklist) {
      opt['blacklist'] = this.blacklist;
    }

    addFilter(this.ffmpeg, {
      filter: 'ocr',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ocr = ocr;
