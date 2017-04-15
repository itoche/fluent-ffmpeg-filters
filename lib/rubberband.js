const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the rubberband function.
 *
 *
 * @example
 *  ffmpeg().rubberband()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the rubberband function.
 */
function rubberband(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'rubberband', function() {
    return new RubberbandFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class RubberbandFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    RubberbandFilter.prototype.withTempo = this.tempo;
    RubberbandFilter.prototype.withPitch = this.pitch;
    RubberbandFilter.prototype.withTransients = this.transients;
    RubberbandFilter.prototype.withDetector = this.detector;
    RubberbandFilter.prototype.withPhase = this.phase;
    RubberbandFilter.prototype.withWindow = this.window;
    RubberbandFilter.prototype.withSmoothing = this.smoothing;
    RubberbandFilter.prototype.withFormant = this.formant;
    RubberbandFilter.prototype.withPitchq = this.pitchq;
    RubberbandFilter.prototype.withChannels = this.channels;
  }

  /**
   * Set tempo scale factor.
   * 
   * 
   * @param val
   */
  tempo(val) {
    this.tempo = val;
    return this;
  }

  /**
   * Set pitch scale factor.
   * 
   * 
   * @param val
   */
  pitch(val) {
    this.pitch = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  transients(val) {
    this.transients = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  detector(val) {
    this.detector = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  phase(val) {
    this.phase = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  window(val) {
    this.window = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  smoothing(val) {
    this.smoothing = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  formant(val) {
    this.formant = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  pitchq(val) {
    this.pitchq = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  channels(val) {
    this.channels = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.tempo) {
      opt['tempo'] = this.tempo;
    }
    if (this.pitch) {
      opt['pitch'] = this.pitch;
    }
    if (this.transients) {
      opt['transients'] = this.transients;
    }
    if (this.detector) {
      opt['detector'] = this.detector;
    }
    if (this.phase) {
      opt['phase'] = this.phase;
    }
    if (this.window) {
      opt['window'] = this.window;
    }
    if (this.smoothing) {
      opt['smoothing'] = this.smoothing;
    }
    if (this.formant) {
      opt['formant'] = this.formant;
    }
    if (this.pitchq) {
      opt['pitchq'] = this.pitchq;
    }
    if (this.channels) {
      opt['channels'] = this.channels;
    }

    addFilter(this.ffmpeg, {
      filter: 'rubberband',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.rubberband = rubberband;
