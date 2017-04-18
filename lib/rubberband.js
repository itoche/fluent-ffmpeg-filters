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
    this._tempo = val;
    return this;
  }

  /**
   * Set pitch scale factor.
   * 
   * 
   * @param val
   */
  pitch(val) {
    this._pitch = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  transients(val) {
    this._transients = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  detector(val) {
    this._detector = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  phase(val) {
    this._phase = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  window(val) {
    this._window = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  smoothing(val) {
    this._smoothing = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  formant(val) {
    this._formant = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  pitchq(val) {
    this._pitchq = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  channels(val) {
    this._channels = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._tempo) {
      opt['tempo'] = this._tempo;
    }
    if (this._pitch) {
      opt['pitch'] = this._pitch;
    }
    if (this._transients) {
      opt['transients'] = this._transients;
    }
    if (this._detector) {
      opt['detector'] = this._detector;
    }
    if (this._phase) {
      opt['phase'] = this._phase;
    }
    if (this._window) {
      opt['window'] = this._window;
    }
    if (this._smoothing) {
      opt['smoothing'] = this._smoothing;
    }
    if (this._formant) {
      opt['formant'] = this._formant;
    }
    if (this._pitchq) {
      opt['pitchq'] = this._pitchq;
    }
    if (this._channels) {
      opt['channels'] = this._channels;
    }

    addFilter(this.ffmpeg, {
      filter: 'rubberband',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.rubberband = rubberband;
