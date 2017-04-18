const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the ametadata function.
 *
 *
 * @example
 *  ffmpeg().ametadata()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the ametadata function.
 */
function ametadata(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'ametadata', function() {
    return new AmetadataFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AmetadataFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AmetadataFilter.prototype.withMode = this.mode;
    AmetadataFilter.prototype.withKey = this.key;
    AmetadataFilter.prototype.withValue = this.value;
    AmetadataFilter.prototype.withFunction = this._function;
    AmetadataFilter.prototype.withExpr = this.expr;
    AmetadataFilter.prototype.withFile = this.file;
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
   * Set key used with all modes. Must be set for all modes except print and delete.
   * 
   * 
   * @param val
   */
  key(val) {
    this._key = val;
    return this;
  }

  /**
   * Set metadata value which will be used. This option is mandatory for
   * modify and add mode.
   * 
   * 
   * @param val
   */
  value(val) {
    this._value = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  _function(val) {
    this.__function = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  expr(val) {
    this._expr = val;
    return this;
  }

  /**
   * If specified in print mode, output is written to the named file. Instead of
   * plain filename any writable url can be specified. Filename “-” is a shorthand
   * for standard output. If file option is not set, output is written to the log
   * with AV_LOG_INFO loglevel.
   * 
   * 
   * @param val
   */
  file(val) {
    this._file = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._key) {
      opt['key'] = this._key;
    }
    if (this._value) {
      opt['value'] = this._value;
    }
    if (this.__function) {
      opt['function'] = this.__function;
    }
    if (this._expr) {
      opt['expr'] = this._expr;
    }
    if (this._file) {
      opt['file'] = this._file;
    }

    addFilter(this.ffmpeg, {
      filter: 'ametadata',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ametadata = ametadata;
