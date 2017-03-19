const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the ashowinfo function.
 *
 *
 * @example
 *  ffmpeg().ashowinfo()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the ashowinfo function.
 */
function ashowinfo(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'ashowinfo', function() {
    return new AshowinfoFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AshowinfoFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Ashowinfo.prototype.withN = n;
    Ashowinfo.prototype.withPts = pts;
    Ashowinfo.prototype.withPts_time = pts_time;
    Ashowinfo.prototype.withPos = pos;
    Ashowinfo.prototype.withFmt = fmt;
    Ashowinfo.prototype.withChlayout = chlayout;
    Ashowinfo.prototype.withRate = rate;
    Ashowinfo.prototype.withNb_samples = nb_samples;
    Ashowinfo.prototype.withChecksum = checksum;
    Ashowinfo.prototype.withPlane_checksums = plane_checksums;
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
   * The presentation timestamp of the input frame, in time base units; the time base
   * depends on the filter input pad, and is usually 1/sample_rate.
   * 
   * 
   * @param val
   */
  pts(val) {
    this.pts = val;
    return this;
  }

  /**
   * The presentation timestamp of the input frame in seconds.
   * 
   * 
   * @param val
   */
  pts_time(val) {
    this.pts_time = val;
    return this;
  }

  /**
   * position of the frame in the input stream, -1 if this information in
   * unavailable and/or meaningless (for example in case of synthetic audio)
   * 
   * 
   * @param val
   */
  pos(val) {
    this.pos = val;
    return this;
  }

  /**
   * The sample format.
   * 
   * 
   * @param val
   */
  fmt(val) {
    this.fmt = val;
    return this;
  }

  /**
   * The channel layout.
   * 
   * 
   * @param val
   */
  chlayout(val) {
    this.chlayout = val;
    return this;
  }

  /**
   * The sample rate for the audio frame.
   * 
   * 
   * @param val
   */
  rate(val) {
    this.rate = val;
    return this;
  }

  /**
   * The number of samples (per channel) in the frame.
   * 
   * 
   * @param val
   */
  nb_samples(val) {
    this.nb_samples = val;
    return this;
  }

  /**
   * The Adler-32 checksum (printed in hexadecimal) of the audio data. For planar
   * audio, the data is treated as if all the planes were concatenated.
   * 
   * 
   * @param val
   */
  checksum(val) {
    this.checksum = val;
    return this;
  }

  /**
   * A list of Adler-32 checksums for each data plane.
   * 
   * @param val
   */
  plane_checksums(val) {
    this.plane_checksums = val;
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
    if (this.chlayout) {
      opt.chlayout = this.chlayout;
    }
    if (this.rate) {
      opt.rate = this.rate;
    }
    if (this.nb_samples) {
      opt.nb_samples = this.nb_samples;
    }
    if (this.checksum) {
      opt.checksum = this.checksum;
    }
    if (this.plane_checksums) {
      opt.plane_checksums = this.plane_checksums;
    }

    addFilter(this.ffmpeg, {
      filter: 'ashowinfo',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ashowinfo = ashowinfo;
