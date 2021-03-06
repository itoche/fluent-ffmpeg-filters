const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the sofalizer function.
 *
 *
 * @example
 *  ffmpeg().sofalizer()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the sofalizer function.
 */
function sofalizer(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'sofalizer', function() {
    return new SofalizerFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SofalizerFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SofalizerFilter.prototype.withSofa = this.sofa;
    SofalizerFilter.prototype.withGain = this.gain;
    SofalizerFilter.prototype.withRotation = this.rotation;
    SofalizerFilter.prototype.withElevation = this.elevation;
    SofalizerFilter.prototype.withRadius = this.radius;
    SofalizerFilter.prototype.withType = this.type;
    SofalizerFilter.prototype.withSpeakers = this.speakers;
  }

  /**
   * Set the SOFA file used for rendering.
   * 
   * 
   * @param val
   */
  sofa(val) {
    this._sofa = val;
    return this;
  }

  /**
   * Set gain applied to audio. Value is in dB. Default is 0.
   * 
   * 
   * @param val
   */
  gain(val) {
    this._gain = val;
    return this;
  }

  /**
   * Set rotation of virtual loudspeakers in deg. Default is 0.
   * 
   * 
   * @param val
   */
  rotation(val) {
    this._rotation = val;
    return this;
  }

  /**
   * Set elevation of virtual speakers in deg. Default is 0.
   * 
   * 
   * @param val
   */
  elevation(val) {
    this._elevation = val;
    return this;
  }

  /**
   * Set distance in meters between loudspeakers and the listener with near-field
   * HRTFs. Default is 1.
   * 
   * 
   * @param val
   */
  radius(val) {
    this._radius = val;
    return this;
  }

  /**
   * Set processing type. Can be time or freq. time is
   * processing audio in time domain which is slow.
   * freq is processing audio in frequency domain which is fast.
   * Default is freq.
   * 
   * 
   * @param val
   */
  type(val) {
    this._type = val;
    return this;
  }

  /**
   * Set custom positions of virtual loudspeakers. Syntax for this option is:
   * &lt;CH&gt; &lt;AZIM&gt; &lt;ELEV&gt;[|&lt;CH&gt; &lt;AZIM&gt; &lt;ELEV&gt;|...].
   * Each virtual loudspeaker is described with short channel name following with
   * azimuth and elevation in degreees.
   * Each virtual loudspeaker description is separated by ’|’.
   * For example to override front left and front right channel positions use:
   * ’speakers&#x3D;FL 45 15|FR 345 15’.
   * Descriptions with unrecognised channel names are ignored.
   * 
   * @param val
   */
  speakers(val) {
    this._speakers = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._sofa) {
      opt['sofa'] = this._sofa;
    }
    if (this._gain) {
      opt['gain'] = this._gain;
    }
    if (this._rotation) {
      opt['rotation'] = this._rotation;
    }
    if (this._elevation) {
      opt['elevation'] = this._elevation;
    }
    if (this._radius) {
      opt['radius'] = this._radius;
    }
    if (this._type) {
      opt['type'] = this._type;
    }
    if (this._speakers) {
      opt['speakers'] = this._speakers;
    }

    addFilter(this.ffmpeg, {
      filter: 'sofalizer',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.sofalizer = sofalizer;
