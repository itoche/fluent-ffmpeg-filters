const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the asidedata function.
 *
 *
 * @example
 *  ffmpeg().asidedata()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the asidedata function.
 */
function asidedata(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'asidedata', function() {
    return new AsidedataFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AsidedataFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AsidedataFilter.prototype.withMode = this.mode;
    AsidedataFilter.prototype.withType = this.type;
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
   * Set side data type used with all modes. Must be set for select mode. For
   * the list of frame side data types, refer to the AVFrameSideDataType enum
   * in libavutil/frame.h. For example, to choose
   * AV_FRAME_DATA_PANSCAN side data, you must specify PANSCAN.
   * 
   * 
   * @param val
   */
  type(val) {
    this._type = val;
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
    if (this._type) {
      opt['type'] = this._type;
    }

    addFilter(this.ffmpeg, {
      filter: 'asidedata',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.asidedata = asidedata;
