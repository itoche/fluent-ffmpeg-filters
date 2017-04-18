const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the asendcmd function.
 *
 *
 * @example
 *  ffmpeg().asendcmd()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the asendcmd function.
 */
function asendcmd(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'asendcmd', function() {
    return new AsendcmdFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AsendcmdFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AsendcmdFilter.prototype.withCommands = this.commands;
    AsendcmdFilter.prototype.withFilename = this.filename;
  }

  /**
   * Set the commands to be read and sent to the other filters.
   * 
   * @param val
   */
  commands(val) {
    this._commands = val;
    return this;
  }

  /**
   * Set the filename of the commands to be read and sent to the other
   * filters.
   * 
   * @param val
   */
  filename(val) {
    this._filename = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._commands) {
      opt['commands'] = this._commands;
    }
    if (this._filename) {
      opt['filename'] = this._filename;
    }

    addFilter(this.ffmpeg, {
      filter: 'asendcmd',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.asendcmd = asendcmd;
