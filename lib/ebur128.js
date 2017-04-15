const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the ebur128 function.
 *
 *
 * @example
 *  ffmpeg().ebur128()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the ebur128 function.
 */
function ebur128(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'ebur128', function() {
    return new Ebur128Filter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class Ebur128Filter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Ebur128.prototype.withVideo = video;
    Ebur128.prototype.withSize = size;
    Ebur128.prototype.withMeter = meter;
    Ebur128.prototype.withMetadata = metadata;
    Ebur128.prototype.withFramelog = framelog;
    Ebur128.prototype.withPeak = peak;
    Ebur128.prototype.withDualmono = dualmono;
    Ebur128.prototype.withPanlaw = panlaw;
  }

  /**
   * Activate the video output. The audio stream is passed unchanged whether this
   * option is set or no. The video stream will be the first output stream if
   * activated. Default is 0.
   * 
   * 
   * @param val
   */
  video(val) {
    this.video = val;
    return this;
  }

  /**
   * Set the video size. This option is for video only. For the syntax of this
   * option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Default and minimum resolution is 640x480.
   * 
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }

  /**
   * Set the EBU scale meter. Default is 9. Common values are 9 and
   * 18, respectively for EBU scale meter +9 and EBU scale meter +18. Any
   * other integer value between this range is allowed.
   * 
   * 
   * @param val
   */
  meter(val) {
    this.meter = val;
    return this;
  }

  /**
   * Set metadata injection. If set to 1, the audio input will be segmented
   * into 100ms output frames, each of them containing various loudness information
   * in metadata.  All the metadata keys are prefixed with lavfi.r128..
   * 
   * Default is 0.
   * 
   * 
   * @param val
   */
  metadata(val) {
    this.metadata = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  framelog(val) {
    this.framelog = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  peak(val) {
    this.peak = val;
    return this;
  }

  /**
   * Treat mono input files as &quot;dual mono&quot;. If a mono file is intended for playback
   * on a stereo system, its EBU R128 measurement will be perceptually incorrect.
   * If set to true, this option will compensate for this effect.
   * Multi-channel input files are not affected by this option.
   * 
   * 
   * @param val
   */
  dualmono(val) {
    this.dualmono = val;
    return this;
  }

  /**
   * Set a specific pan law to be used for the measurement of dual mono files.
   * This parameter is optional, and has a default value of -3.01dB.
   * 
   * @param val
   */
  panlaw(val) {
    this.panlaw = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.video) {
      opt['video'] = this.video;
    }
    if (this.size) {
      opt['size'] = this.size;
    }
    if (this.meter) {
      opt['meter'] = this.meter;
    }
    if (this.metadata) {
      opt['metadata'] = this.metadata;
    }
    if (this.framelog) {
      opt['framelog'] = this.framelog;
    }
    if (this.peak) {
      opt['peak'] = this.peak;
    }
    if (this.dualmono) {
      opt['dualmono'] = this.dualmono;
    }
    if (this.panlaw) {
      opt['panlaw'] = this.panlaw;
    }

    addFilter(this.ffmpeg, {
      filter: 'ebur128',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.ebur128 = ebur128;
