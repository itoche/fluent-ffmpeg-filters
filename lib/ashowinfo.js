const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the ashowinfo function.
 *
 *
 * @example
 *  ffmpeg().ashowinfo()
 *    ...             // call filter configuration functions
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
    AshowinfoFilter.prototype.withN = this.n;
    AshowinfoFilter.prototype.withPts = this.pts;
    AshowinfoFilter.prototype.withPts_time = this.pts_time;
    AshowinfoFilter.prototype.withPos = this.pos;
    AshowinfoFilter.prototype.withFmt = this.fmt;
    AshowinfoFilter.prototype.withChlayout = this.chlayout;
    AshowinfoFilter.prototype.withRate = this.rate;
    AshowinfoFilter.prototype.withNb_samples = this.nb_samples;
    AshowinfoFilter.prototype.withChecksum = this.checksum;
    AshowinfoFilter.prototype.withPlane_checksums = this.plane_checksums;
  }

  /**
   * The (sequential) number of the input frame, starting from 0.
   * 
   * 
   * @param val
   */
  n(val) {
    this._n = val;
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
    this._pts = val;
    return this;
  }

  /**
   * The presentation timestamp of the input frame in seconds.
   * 
   * 
   * @param val
   */
  pts_time(val) {
    this._pts_time = val;
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
    this._pos = val;
    return this;
  }

  /**
   * The sample format.
   * 
   * 
   * @param val
   */
  fmt(val) {
    this._fmt = val;
    return this;
  }

  /**
   * The channel layout.
   * 
   * 
   * @param val
   */
  chlayout(val) {
    this._chlayout = val;
    return this;
  }

  /**
   * The sample rate for the audio frame.
   * 
   * 
   * @param val
   */
  rate(val) {
    this._rate = val;
    return this;
  }

  /**
   * The number of samples (per channel) in the frame.
   * 
   * 
   * @param val
   */
  nb_samples(val) {
    this._nb_samples = val;
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
    this._checksum = val;
    return this;
  }

  /**
   * A list of Adler-32 checksums for each data plane.
   * 
   * @param val
   */
  plane_checksums(val) {
    this._plane_checksums = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._n) {
      opt['n'] = this._n;
    }
    if (this._pts) {
      opt['pts'] = this._pts;
    }
    if (this._pts_time) {
      opt['pts_time'] = this._pts_time;
    }
    if (this._pos) {
      opt['pos'] = this._pos;
    }
    if (this._fmt) {
      opt['fmt'] = this._fmt;
    }
    if (this._chlayout) {
      opt['chlayout'] = this._chlayout;
    }
    if (this._rate) {
      opt['rate'] = this._rate;
    }
    if (this._nb_samples) {
      opt['nb_samples'] = this._nb_samples;
    }
    if (this._checksum) {
      opt['checksum'] = this._checksum;
    }
    if (this._plane_checksums) {
      opt['plane_checksums'] = this._plane_checksums;
    }

    addFilter(this.ffmpeg, {
      filter: 'ashowinfo',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ashowinfo = ashowinfo;
