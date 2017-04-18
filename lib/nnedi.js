const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the nnedi function.
 *
 *
 * @example
 *  ffmpeg().nnedi()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the nnedi function.
 */
function nnedi(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'nnedi', function() {
    return new NnediFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class NnediFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    NnediFilter.prototype.withWeights = this.weights;
    NnediFilter.prototype.withDeint = this.deint;
    NnediFilter.prototype.withField = this.field;
    NnediFilter.prototype.withPlanes = this.planes;
    NnediFilter.prototype.withNsize = this.nsize;
    NnediFilter.prototype.withNns = this.nns;
    NnediFilter.prototype.withQual = this.qual;
    NnediFilter.prototype.withEtype = this.etype;
    NnediFilter.prototype.withPscrn = this.pscrn;
    NnediFilter.prototype.withFapprox = this.fapprox;
  }

  /**
   * Mandatory option, without binary file filter can not work.
   * Currently file can be found here:
   * https://github.com/dubhater/vapoursynth-nnedi3/blob/master/src/nnedi3_weights.bin
   * 
   * 
   * @param val
   */
  weights(val) {
    this._weights = val;
    return this;
  }

  /**
   * Set which frames to deinterlace, by default it is all.
   * Can be all or interlaced.
   * 
   * 
   * @param val
   */
  deint(val) {
    this._deint = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  field(val) {
    this._field = val;
    return this;
  }

  /**
   * Set which planes to process, by default filter process all frames.
   * 
   * 
   * @param val
   */
  planes(val) {
    this._planes = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  nsize(val) {
    this._nsize = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  nns(val) {
    this._nns = val;
    return this;
  }

  /**
   * Controls the number of different neural network predictions that are blended
   * together to compute the final output value. Can be fast, default or
   * slow.
   * 
   * 
   * @param val
   */
  qual(val) {
    this._qual = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  etype(val) {
    this._etype = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  pscrn(val) {
    this._pscrn = val;
    return this;
  }

  /**
   * Set various debugging flags.
   * 
   * @param val
   */
  fapprox(val) {
    this._fapprox = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._weights) {
      opt['weights'] = this._weights;
    }
    if (this._deint) {
      opt['deint'] = this._deint;
    }
    if (this._field) {
      opt['field'] = this._field;
    }
    if (this._planes) {
      opt['planes'] = this._planes;
    }
    if (this._nsize) {
      opt['nsize'] = this._nsize;
    }
    if (this._nns) {
      opt['nns'] = this._nns;
    }
    if (this._qual) {
      opt['qual'] = this._qual;
    }
    if (this._etype) {
      opt['etype'] = this._etype;
    }
    if (this._pscrn) {
      opt['pscrn'] = this._pscrn;
    }
    if (this._fapprox) {
      opt['fapprox'] = this._fapprox;
    }

    addFilter(this.ffmpeg, {
      filter: 'nnedi',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.nnedi = nnedi;
