const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the coreimagesrc function.
 *
 *
 * @example
 *  ffmpeg().coreimagesrc()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the coreimagesrc function.
 */
function coreimagesrc(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'coreimagesrc', function() {
    return new CoreimagesrcFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class CoreimagesrcFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    CoreimagesrcFilter.prototype.withList_generators = this.list_generators;
    CoreimagesrcFilter.prototype.withSize = this.size;
    CoreimagesrcFilter.prototype.withRate = this.rate;
    CoreimagesrcFilter.prototype.withSar = this.sar;
    CoreimagesrcFilter.prototype.withDuration = this.duration;
  }

  /**
   * List all available generators along with all their respective options as well as
   * possible minimum and maximum values along with the default values.
   * 
   * list_generators&#x3D;true
   * 
   * 
   * 
   * @param val
   */
  list_generators(val) {
    this._list_generators = val;
    return this;
  }

  /**
   * Specify the size of the sourced video. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * The default value is 320x240.
   * 
   * 
   * @param val
   */
  size(val) {
    this._size = val;
    return this;
  }

  /**
   * Specify the frame rate of the sourced video, as the number of frames
   * generated per second. It has to be a string in the format
   * frame_rate_num/frame_rate_den, an integer number, a floating point
   * number or a valid video frame rate abbreviation. The default value is
   * &quot;25&quot;.
   * 
   * 
   * @param val
   */
  rate(val) {
    this._rate = val;
    return this;
  }

  /**
   * Set the sample aspect ratio of the sourced video.
   * 
   * 
   * @param val
   */
  sar(val) {
    this._sar = val;
    return this;
  }

  /**
   * Set the duration of the sourced video. See
   * (ffmpeg-utils)the Time duration section in the ffmpeg-utils(1) manual
   * for the accepted syntax.
   * 
   * If not specified, or the expressed duration is negative, the video is
   * supposed to be generated forever.
   * 
   * @param val
   */
  duration(val) {
    this._duration = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._list_generators) {
      opt['list_generators'] = this._list_generators;
    }
    if (this._size) {
      opt['size'] = this._size;
    }
    if (this._rate) {
      opt['rate'] = this._rate;
    }
    if (this._sar) {
      opt['sar'] = this._sar;
    }
    if (this._duration) {
      opt['duration'] = this._duration;
    }

    addFilter(this.ffmpeg, {
      filter: 'coreimagesrc',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.coreimagesrc = coreimagesrc;
