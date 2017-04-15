const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the pan function.
 *
 *
 * @example
 *  ffmpeg().pan()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the pan function.
 */
function pan(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'pan', function() {
    return new PanFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class PanFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    PanFilter.prototype.withL = l;
    PanFilter.prototype.withOutdef = outdef;
    PanFilter.prototype.withOut_name = out_name;
    PanFilter.prototype.withGain = gain;
    PanFilter.prototype.withIn_name = in_name;
  }

  /**
   * output channel layout or number of channels
   * 
   * 
   * @param val
   */
  l(val) {
    this.l = val;
    return this;
  }

  /**
   * output channel specification, of the form:
   * &quot;out_name&#x3D;[gain*]in_name[(+-)[gain*]in_name...]&quot;
   * 
   * 
   * @param val
   */
  outdef(val) {
    this.outdef = val;
    return this;
  }

  /**
   * output channel to define, either a channel name (FL, FR, etc.) or a channel
   * number (c0, c1, etc.)
   * 
   * 
   * @param val
   */
  out_name(val) {
    this.out_name = val;
    return this;
  }

  /**
   * multiplicative coefficient for the channel, 1 leaving the volume unchanged
   * 
   * 
   * @param val
   */
  gain(val) {
    this.gain = val;
    return this;
  }

  /**
   * input channel to use, see out_name for details; it is not possible to mix
   * named and numbered input channels
   * 
   * @param val
   */
  in_name(val) {
    this.in_name = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.l) {
      opt['l'] = this.l;
    }
    if (this.outdef) {
      opt['outdef'] = this.outdef;
    }
    if (this.out_name) {
      opt['out_name'] = this.out_name;
    }
    if (this.gain) {
      opt['gain'] = this.gain;
    }
    if (this.in_name) {
      opt['in_name'] = this.in_name;
    }

    addFilter(this.ffmpeg, {
      filter: 'pan',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.pan = pan;
