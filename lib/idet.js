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
    this._single_current_frame = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as top field first using single-frame detection.
   * 
   * 
   * @param val
   */
  single_tff(val) {
    this._single_tff = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as top field first using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple_tff(val) {
    this._multiple_tff = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as bottom field first using single-frame detection.
   * 
   * 
   * @param val
   */
  single_bff(val) {
    this._single_bff = val;
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
    this._multiple_current_frame = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as bottom field first using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple_bff(val) {
    this._multiple_bff = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as progressive using single-frame detection.
   * 
   * 
   * @param val
   */
  single_progressive(val) {
    this._single_progressive = val;
    return this;
  }

  /**
   * Cumulative number of frames detected as progressive using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple_progressive(val) {
    this._multiple_progressive = val;
    return this;
  }

  /**
   * Cumulative number of frames that could not be classified using single-frame detection.
   * 
   * 
   * @param val
   */
  single_undetermined(val) {
    this._single_undetermined = val;
    return this;
  }

  /**
   * Cumulative number of frames that could not be classified using multiple-frame detection.
   * 
   * 
   * @param val
   */
  multiple_undetermined(val) {
    this._multiple_undetermined = val;
    return this;
  }

  /**
   * Which field in the current frame is repeated from the last. One of “neither”, “top”, or “bottom”.
   * 
   * 
   * @param val
   */
  repeated_current_frame(val) {
    this._repeated_current_frame = val;
    return this;
  }

  /**
   * Cumulative number of frames with no repeated field.
   * 
   * 
   * @param val
   */
  repeated_neither(val) {
    this._repeated_neither = val;
    return this;
  }

  /**
   * Cumulative number of frames with the top field repeated from the previous frame’s top field.
   * 
   * 
   * @param val
   */
  repeated_top(val) {
    this._repeated_top = val;
    return this;
  }

  /**
   * Cumulative number of frames with the bottom field repeated from the previous frame’s bottom field.
   * 
   * @param val
   */
  repeated_bottom(val) {
    this._repeated_bottom = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._single_current_frame) {
      opt['single.current_frame'] = this._single_current_frame;
    }
    if (this._single_tff) {
      opt['single.tff'] = this._single_tff;
    }
    if (this._multiple_tff) {
      opt['multiple.tff'] = this._multiple_tff;
    }
    if (this._single_bff) {
      opt['single.bff'] = this._single_bff;
    }
    if (this._multiple_current_frame) {
      opt['multiple.current_frame'] = this._multiple_current_frame;
    }
    if (this._multiple_bff) {
      opt['multiple.bff'] = this._multiple_bff;
    }
    if (this._single_progressive) {
      opt['single.progressive'] = this._single_progressive;
    }
    if (this._multiple_progressive) {
      opt['multiple.progressive'] = this._multiple_progressive;
    }
    if (this._single_undetermined) {
      opt['single.undetermined'] = this._single_undetermined;
    }
    if (this._multiple_undetermined) {
      opt['multiple.undetermined'] = this._multiple_undetermined;
    }
    if (this._repeated_current_frame) {
      opt['repeated.current_frame'] = this._repeated_current_frame;
    }
    if (this._repeated_neither) {
      opt['repeated.neither'] = this._repeated_neither;
    }
    if (this._repeated_top) {
      opt['repeated.top'] = this._repeated_top;
    }
    if (this._repeated_bottom) {
      opt['repeated.bottom'] = this._repeated_bottom;
    }

    addFilter(this.ffmpeg, {
      filter: 'idet',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.idet = idet;
