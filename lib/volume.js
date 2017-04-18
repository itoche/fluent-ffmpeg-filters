const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the volume function.
 *
 *
 * @example
 *  ffmpeg().volume()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the volume function.
 */
function volume(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'volume', function() {
    return new VolumeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class VolumeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    VolumeFilter.prototype.withVolume = this.volume;
    VolumeFilter.prototype.withPrecision = this.precision;
    VolumeFilter.prototype.withReplaygain = this.replaygain;
    VolumeFilter.prototype.withReplaygain_preamp = this.replaygain_preamp;
    VolumeFilter.prototype.withEval = this.eval;
  }

  /**
   * Set audio volume expression.
   * 
   * Output values are clipped to the maximum value.
   * 
   * The output audio volume is given by the relation:
   * 
   * output_volume &#x3D; volume * input_volume
   * 
   * 
   * The default value for volume is &quot;1.0&quot;.
   * 
   * 
   * @param val
   */
  volume(val) {
    this._volume = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  precision(val) {
    this._precision = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  replaygain(val) {
    this._replaygain = val;
    return this;
  }

  /**
   * Pre-amplification gain in dB to apply to the selected replaygain gain.
   * 
   * Default value for replaygain_preamp is 0.0.
   * 
   * 
   * @param val
   */
  replaygain_preamp(val) {
    this._replaygain_preamp = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  eval(val) {
    this._eval = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._volume) {
      opt['volume'] = this._volume;
    }
    if (this._precision) {
      opt['precision'] = this._precision;
    }
    if (this._replaygain) {
      opt['replaygain'] = this._replaygain;
    }
    if (this._replaygain_preamp) {
      opt['replaygain_preamp'] = this._replaygain_preamp;
    }
    if (this._eval) {
      opt['eval'] = this._eval;
    }

    addFilter(this.ffmpeg, {
      filter: 'volume',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.volume = volume;
