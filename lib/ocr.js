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
    OcrFilter.prototype.withDatapath = this.datapath;
    OcrFilter.prototype.withLanguage = this.language;
    OcrFilter.prototype.withWhitelist = this.whitelist;
    OcrFilter.prototype.withBlacklist = this.blacklist;
  }

  /**
   * Set datapath to tesseract data. Default is to use whatever was
   * set at installation.
   * 
   * 
   * @param val
   */
  datapath(val) {
    this._datapath = val;
    return this;
  }

  /**
   * Set language, default is &quot;eng&quot;.
   * 
   * 
   * @param val
   */
  language(val) {
    this._language = val;
    return this;
  }

  /**
   * Set character whitelist.
   * 
   * 
   * @param val
   */
  whitelist(val) {
    this._whitelist = val;
    return this;
  }

  /**
   * Set character blacklist.
   * 
   * @param val
   */
  blacklist(val) {
    this._blacklist = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._datapath) {
      opt['datapath'] = this._datapath;
    }
    if (this._language) {
      opt['language'] = this._language;
    }
    if (this._whitelist) {
      opt['whitelist'] = this._whitelist;
    }
    if (this._blacklist) {
      opt['blacklist'] = this._blacklist;
    }

    addFilter(this.ffmpeg, {
      filter: 'ocr',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ocr = ocr;
