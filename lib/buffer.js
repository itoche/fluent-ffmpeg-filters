const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the buffer function.
 *
 *
 * @example
 *  ffmpeg().buffer()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the buffer function.
 */
function buffer(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'buffer', function() {
    return new BufferFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class BufferFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    BufferFilter.prototype.withVideo_size = this.video_size;
    BufferFilter.prototype.withWidth = this.width;
    BufferFilter.prototype.withHeight = this.height;
    BufferFilter.prototype.withPix_fmt = this.pix_fmt;
    BufferFilter.prototype.withTime_base = this.time_base;
    BufferFilter.prototype.withFrame_rate = this.frame_rate;
    BufferFilter.prototype.withPixel_aspect = this.pixel_aspect;
    BufferFilter.prototype.withSws_param = this.sws_param;
    BufferFilter.prototype.withHw_frames_ctx = this.hw_frames_ctx;
  }

  /**
   * Specify the size (width and height) of the buffered video frames. For the
   * syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * 
   * 
   * @param val
   */
  video_size(val) {
    this._video_size = val;
    return this;
  }

  /**
   * The input video width.
   * 
   * 
   * @param val
   */
  width(val) {
    this._width = val;
    return this;
  }

  /**
   * The input video height.
   * 
   * 
   * @param val
   */
  height(val) {
    this._height = val;
    return this;
  }

  /**
   * A string representing the pixel format of the buffered video frames.
   * It may be a number corresponding to a pixel format, or a pixel format
   * name.
   * 
   * 
   * @param val
   */
  pix_fmt(val) {
    this._pix_fmt = val;
    return this;
  }

  /**
   * Specify the timebase assumed by the timestamps of the buffered frames.
   * 
   * 
   * @param val
   */
  time_base(val) {
    this._time_base = val;
    return this;
  }

  /**
   * Specify the frame rate expected for the video stream.
   * 
   * 
   * @param val
   */
  frame_rate(val) {
    this._frame_rate = val;
    return this;
  }

  /**
   * The sample (pixel) aspect ratio of the input video.
   * 
   * 
   * @param val
   */
  pixel_aspect(val) {
    this._pixel_aspect = val;
    return this;
  }

  /**
   * Specify the optional parameters to be used for the scale filter which
   * is automatically inserted when an input change is detected in the
   * input size or format.
   * 
   * 
   * @param val
   */
  sws_param(val) {
    this._sws_param = val;
    return this;
  }

  /**
   * When using a hardware pixel format, this should be a reference to an
   * AVHWFramesContext describing input frames.
   * 
   * @param val
   */
  hw_frames_ctx(val) {
    this._hw_frames_ctx = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._video_size) {
      opt['video_size'] = this._video_size;
    }
    if (this._width) {
      opt['width'] = this._width;
    }
    if (this._height) {
      opt['height'] = this._height;
    }
    if (this._pix_fmt) {
      opt['pix_fmt'] = this._pix_fmt;
    }
    if (this._time_base) {
      opt['time_base'] = this._time_base;
    }
    if (this._frame_rate) {
      opt['frame_rate'] = this._frame_rate;
    }
    if (this._pixel_aspect) {
      opt['pixel_aspect'] = this._pixel_aspect;
    }
    if (this._sws_param) {
      opt['sws_param'] = this._sws_param;
    }
    if (this._hw_frames_ctx) {
      opt['hw_frames_ctx'] = this._hw_frames_ctx;
    }

    addFilter(this.ffmpeg, {
      filter: 'buffer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.buffer = buffer;
