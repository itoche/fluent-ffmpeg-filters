const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the showinfo function.
 *
 *
 * @example
 *  ffmpeg().showinfo()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the showinfo function.
 */
function showinfo(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'showinfo', function() {
    return new ShowinfoFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class ShowinfoFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Showinfo.prototype.withN = n;
    Showinfo.prototype.withPts = pts;
    Showinfo.prototype.withPts_time = pts_time;
    Showinfo.prototype.withPos = pos;
    Showinfo.prototype.withFmt = fmt;
    Showinfo.prototype.withSar = sar;
    Showinfo.prototype.withS = s;
    Showinfo.prototype.withI = i;
    Showinfo.prototype.withIskey = iskey;
    Showinfo.prototype.withType = type;
    Showinfo.prototype.withChecksum = checksum;
    Showinfo.prototype.withPlane_checksum = plane_checksum;
  }

  /**
   * The (sequential) number of the input frame, starting from 0.
   * 
   * 
   * @param val
   */
  n(val) {
    this.n = val;
    return this;
  }

  /**
   * The Presentation TimeStamp of the input frame, expressed as a number of
   * time base units. The time base unit depends on the filter input pad.
   * 
   * 
   * @param val
   */
  pts(val) {
    this.pts = val;
    return this;
  }

  /**
   * The Presentation TimeStamp of the input frame, expressed as a number of
   * seconds.
   * 
   * 
   * @param val
   */
  pts_time(val) {
    this.pts_time = val;
    return this;
  }

  /**
   * The position of the frame in the input stream, or -1 if this information is
   * unavailable and/or meaningless (for example in case of synthetic video).
   * 
   * 
   * @param val
   */
  pos(val) {
    this.pos = val;
    return this;
  }

  /**
   * The pixel format name.
   * 
   * 
   * @param val
   */
  fmt(val) {
    this.fmt = val;
    return this;
  }

  /**
   * The sample aspect ratio of the input frame, expressed in the form
   * num/den.
   * 
   * 
   * @param val
   */
  sar(val) {
    this.sar = val;
    return this;
  }

  /**
   * The size of the input frame. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * 
   * 
   * @param val
   */
  s(val) {
    this.s = val;
    return this;
  }

  /**
   * The type of interlaced mode (&quot;P&quot; for &quot;progressive&quot;, &quot;T&quot; for top field first, &quot;B&quot;
   * for bottom field first).
   * 
   * 
   * @param val
   */
  i(val) {
    this.i = val;
    return this;
  }

  /**
   * This is 1 if the frame is a key frame, 0 otherwise.
   * 
   * 
   * @param val
   */
  iskey(val) {
    this.iskey = val;
    return this;
  }

  /**
   * The picture type of the input frame (&quot;I&quot; for an I-frame, &quot;P&quot; for a
   * P-frame, &quot;B&quot; for a B-frame, or &quot;?&quot; for an unknown type).
   * Also refer to the documentation of the AVPictureType enum and of
   * the av_get_picture_type_char function defined in
   * libavutil/avutil.h.
   * 
   * 
   * @param val
   */
  type(val) {
    this.type = val;
    return this;
  }

  /**
   * The Adler-32 checksum (printed in hexadecimal) of all the planes of the input frame.
   * 
   * 
   * @param val
   */
  checksum(val) {
    this.checksum = val;
    return this;
  }

  /**
   * The Adler-32 checksum (printed in hexadecimal) of each plane of the input frame,
   * expressed in the form &quot;[c0 c1 c2 c3]&quot;.
   * 
   * @param val
   */
  plane_checksum(val) {
    this.plane_checksum = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.n) {
      opt.n = this.n;
    }
    if (this.pts) {
      opt.pts = this.pts;
    }
    if (this.pts_time) {
      opt.pts_time = this.pts_time;
    }
    if (this.pos) {
      opt.pos = this.pos;
    }
    if (this.fmt) {
      opt.fmt = this.fmt;
    }
    if (this.sar) {
      opt.sar = this.sar;
    }
    if (this.s) {
      opt.s = this.s;
    }
    if (this.i) {
      opt.i = this.i;
    }
    if (this.iskey) {
      opt.iskey = this.iskey;
    }
    if (this.type) {
      opt.type = this.type;
    }
    if (this.checksum) {
      opt.checksum = this.checksum;
    }
    if (this.plane_checksum) {
      opt.plane_checksum = this.plane_checksum;
    }

    addFilter(this.ffmpeg, {
      filter: 'showinfo',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.showinfo = showinfo;
