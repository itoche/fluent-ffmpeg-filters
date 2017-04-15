const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the idet function.
 *
 *
 * @example
 *  ffmpeg().idet()
 *    ...             // call filter configuration functions
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
    IdetFilter.prototype.withSingle_current_frame = this.single_current_frame;
    IdetFilter.prototype.withSingle_tff = this.single_tff;
    IdetFilter.prototype.withMultiple_tff = this.multiple_tff;
    IdetFilter.prototype.withSingle_bff = this.single_bff;
    IdetFilter.prototype.withMultiple_current_frame = this.multiple_current_frame;
    IdetFilter.prototype.withMultiple_bff = this.multiple_bff;
    IdetFilter.prototype.withSingle_progressive = this.single_progressive;
    IdetFilter.prototype.withMultiple_progressive = this.multiple_progressive;
    IdetFilter.prototype.withSingle_undetermined = this.single_undetermined;
    IdetFilter.prototype.withMultiple_undetermined = this.multiple_undetermined;
    IdetFilter.prototype.withRepeated_current_frame = this.repeated_current_frame;
    IdetFilter.prototype.withRepeated_neither = this.repeated_neither;
    IdetFilter.prototype.withRepeated_top = this.repeated_top;
    IdetFilter.prototype.withRepeated_bottom = this.repeated_bottom;
  }

  /**
   * Detected type of current frame using single-frame detection. One of:
   * “tff” (top field first), “bff” (bottom field first),
   * “progressive”, or “undetermined”
   * 
   * 
   * @param val
   */
  single_current_frame(val) {
    this.single_current_frame = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as top field first using single-frame detection.
   * 
   * 
   * @param val
   */
  single_tff(val) {
    this.single_tff = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as top field first using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple_tff(val) {
    this.multiple_tff = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as bottom field first using single-frame detection.
   * 
   * 
   * @param val
   */
  single_bff(val) {
    this.single_bff = val;
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
  multiple_current_frame(val) {
    this.multiple_current_frame = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as bottom field first using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple_bff(val) {
    this.multiple_bff = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as progressive using single-frame detection.
   * 
   * 
   * @param val
   */
  single_progressive(val) {
    this.single_progressive = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as progressive using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple_progressive(val) {
    this.multiple_progressive = val;
    return this;
  }

  /**
   * Cumulative number of frames that could not be classified using single-frame detection.
   * 
   * 
   * @param val
   */
  single_undetermined(val) {
    this.single_undetermined = val;
    return this;
  }

  /**
   * Cumulative number of frames that could not be classified using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple_undetermined(val) {
    this.multiple_undetermined = val;
    return this;
  }

  /**
   * Which field in the current frame is repeated from the last. One of “neither”, “top”, or “bottom”.
   * 
   * 
   * @param val
   */
  repeated_current_frame(val) {
    this.repeated_current_frame = val;
    return this;
  }

  /**
   * Cumulative number of frames with no repeated field.
   * 
   * 
   * @param val
   */
  repeated_neither(val) {
    this.repeated_neither = val;
    return this;
  }

  /**
   * Cumulative number of frames with the top field repeated from the previous frame’s top field.
   * 
   * 
   * @param val
   */
  repeated_top(val) {
    this.repeated_top = val;
    return this;
  }

  /**
   * Cumulative number of frames with the bottom field repeated from the previous frame’s bottom field.
   * 
   * @param val
   */
  repeated_bottom(val) {
    this.repeated_bottom = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.single_current_frame) {
      opt['single.current_frame'] = this.single_current_frame;
    }
    if (this.single_tff) {
      opt['single.tff'] = this.single_tff;
    }
    if (this.multiple_tff) {
      opt['multiple.tff'] = this.multiple_tff;
    }
    if (this.single_bff) {
      opt['single.bff'] = this.single_bff;
    }
    if (this.multiple_current_frame) {
      opt['multiple.current_frame'] = this.multiple_current_frame;
    }
    if (this.multiple_bff) {
      opt['multiple.bff'] = this.multiple_bff;
    }
    if (this.single_progressive) {
      opt['single.progressive'] = this.single_progressive;
    }
    if (this.multiple_progressive) {
      opt['multiple.progressive'] = this.multiple_progressive;
    }
    if (this.single_undetermined) {
      opt['single.undetermined'] = this.single_undetermined;
    }
    if (this.multiple_undetermined) {
      opt['multiple.undetermined'] = this.multiple_undetermined;
    }
    if (this.repeated_current_frame) {
      opt['repeated.current_frame'] = this.repeated_current_frame;
    }
    if (this.repeated_neither) {
      opt['repeated.neither'] = this.repeated_neither;
    }
    if (this.repeated_top) {
      opt['repeated.top'] = this.repeated_top;
    }
    if (this.repeated_bottom) {
      opt['repeated.bottom'] = this.repeated_bottom;
    }

    addFilter(this.ffmpeg, {
      filter: 'idet',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.idet = idet;
