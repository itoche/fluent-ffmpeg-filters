const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the idet function.
 *
 *
 * @example
 *  ffmpeg().idet()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the idet function.
 */
function idet(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'idet', function() {
    return new IdetFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class IdetFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Idet.prototype.withSingle.current_frame = single.current_frame;
    Idet.prototype.withSingle.tff = single.tff;
    Idet.prototype.withMultiple.tff = multiple.tff;
    Idet.prototype.withSingle.bff = single.bff;
    Idet.prototype.withMultiple.current_frame = multiple.current_frame;
    Idet.prototype.withMultiple.bff = multiple.bff;
    Idet.prototype.withSingle.progressive = single.progressive;
    Idet.prototype.withMultiple.progressive = multiple.progressive;
    Idet.prototype.withSingle.undetermined = single.undetermined;
    Idet.prototype.withMultiple.undetermined = multiple.undetermined;
    Idet.prototype.withRepeated.current_frame = repeated.current_frame;
    Idet.prototype.withRepeated.neither = repeated.neither;
    Idet.prototype.withRepeated.top = repeated.top;
    Idet.prototype.withRepeated.bottom = repeated.bottom;
  }

  /**
   * Detected type of current frame using single-frame detection. One of:
   * “tff” (top field first), “bff” (bottom field first),
   * “progressive”, or “undetermined”
   * 
   * 
   * @param val
   */
  single.current_frame(val) {
    this.single.current_frame = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as top field first using single-frame detection.
   * 
   * 
   * @param val
   */
  single.tff(val) {
    this.single.tff = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as top field first using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple.tff(val) {
    this.multiple.tff = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as bottom field first using single-frame detection.
   * 
   * 
   * @param val
   */
  single.bff(val) {
    this.single.bff = val;
    return this;
  }

  /**
   * Detected type of current frame using multiple-frame detection. One of:
   * “tff” (top field first), “bff” (bottom field first),
   * “progressive”, or “undetermined”
   * 
   * 
   * @param val
   */
  multiple.current_frame(val) {
    this.multiple.current_frame = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as bottom field first using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple.bff(val) {
    this.multiple.bff = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as progressive using single-frame detection.
   * 
   * 
   * @param val
   */
  single.progressive(val) {
    this.single.progressive = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as progressive using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple.progressive(val) {
    this.multiple.progressive = val;
    return this;
  }

  /**
   * Cumulative number of frames that could not be classified using single-frame detection.
   * 
   * 
   * @param val
   */
  single.undetermined(val) {
    this.single.undetermined = val;
    return this;
  }

  /**
   * Cumulative number of frames that could not be classified using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple.undetermined(val) {
    this.multiple.undetermined = val;
    return this;
  }

  /**
   * Which field in the current frame is repeated from the last. One of “neither”, “top”, or “bottom”.
   * 
   * 
   * @param val
   */
  repeated.current_frame(val) {
    this.repeated.current_frame = val;
    return this;
  }

  /**
   * Cumulative number of frames with no repeated field.
   * 
   * 
   * @param val
   */
  repeated.neither(val) {
    this.repeated.neither = val;
    return this;
  }

  /**
   * Cumulative number of frames with the top field repeated from the previous frame’s top field.
   * 
   * 
   * @param val
   */
  repeated.top(val) {
    this.repeated.top = val;
    return this;
  }

  /**
   * Cumulative number of frames with the bottom field repeated from the previous frame’s bottom field.
   * 
   * @param val
   */
  repeated.bottom(val) {
    this.repeated.bottom = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.single.current_frame) {
      opt.single.current_frame = this.single.current_frame;
    }
    if (this.single.tff) {
      opt.single.tff = this.single.tff;
    }
    if (this.multiple.tff) {
      opt.multiple.tff = this.multiple.tff;
    }
    if (this.single.bff) {
      opt.single.bff = this.single.bff;
    }
    if (this.multiple.current_frame) {
      opt.multiple.current_frame = this.multiple.current_frame;
    }
    if (this.multiple.bff) {
      opt.multiple.bff = this.multiple.bff;
    }
    if (this.single.progressive) {
      opt.single.progressive = this.single.progressive;
    }
    if (this.multiple.progressive) {
      opt.multiple.progressive = this.multiple.progressive;
    }
    if (this.single.undetermined) {
      opt.single.undetermined = this.single.undetermined;
    }
    if (this.multiple.undetermined) {
      opt.multiple.undetermined = this.multiple.undetermined;
    }
    if (this.repeated.current_frame) {
      opt.repeated.current_frame = this.repeated.current_frame;
    }
    if (this.repeated.neither) {
      opt.repeated.neither = this.repeated.neither;
    }
    if (this.repeated.top) {
      opt.repeated.top = this.repeated.top;
    }
    if (this.repeated.bottom) {
      opt.repeated.bottom = this.repeated.bottom;
    }

    addFilter(this.ffmpeg, {
      filter: 'idet',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.idet = idet;
