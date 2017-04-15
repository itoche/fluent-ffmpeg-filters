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
    AmetadataFilter.prototype.withMode = mode;
    AmetadataFilter.prototype.withKey = key;
    AmetadataFilter.prototype.withValue = value;
    AmetadataFilter.prototype.withFunction = _function;
    AmetadataFilter.prototype.withExpr = expr;
    AmetadataFilter.prototype.withFile = file;
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
   * Set key used with all modes. Must be set for all modes except print and delete.
   * 
   * 
   * @param val
   */
  key(val) {
    this.key = val;
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
    this.value = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  _function(val) {
    this._function = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  expr(val) {
    this.expr = val;
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
    this.file = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.key) {
      opt['key'] = this.key;
    }
    if (this.value) {
      opt['value'] = this.value;
    }
    if (this._function) {
      opt['function'] = this._function;
    }
    if (this.expr) {
      opt['expr'] = this.expr;
    }
    if (this.file) {
      opt['file'] = this.file;
    }

    addFilter(this.ffmpeg, {
      filter: 'ametadata',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ametadata = ametadata;
