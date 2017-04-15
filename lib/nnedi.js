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
    NnediFilter.prototype.withWeights = weights;
    NnediFilter.prototype.withDeint = deint;
    NnediFilter.prototype.withField = field;
    NnediFilter.prototype.withPlanes = planes;
    NnediFilter.prototype.withNsize = nsize;
    NnediFilter.prototype.withNns = nns;
    NnediFilter.prototype.withQual = qual;
    NnediFilter.prototype.withEtype = etype;
    NnediFilter.prototype.withPscrn = pscrn;
    NnediFilter.prototype.withFapprox = fapprox;
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
    this.weights = val;
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
    this.deint = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  field(val) {
    this.field = val;
    return this;
  }

  /**
   * Set which planes to process, by default filter process all frames.
   * 
   * 
   * @param val
   */
  planes(val) {
    this.planes = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  nsize(val) {
    this.nsize = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  nns(val) {
    this.nns = val;
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
    this.qual = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  etype(val) {
    this.etype = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  pscrn(val) {
    this.pscrn = val;
    return this;
  }

  /**
   * Set various debugging flags.
   * 
   * @param val
   */
  fapprox(val) {
    this.fapprox = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.weights) {
      opt['weights'] = this.weights;
    }
    if (this.deint) {
      opt['deint'] = this.deint;
    }
    if (this.field) {
      opt['field'] = this.field;
    }
    if (this.planes) {
      opt['planes'] = this.planes;
    }
    if (this.nsize) {
      opt['nsize'] = this.nsize;
    }
    if (this.nns) {
      opt['nns'] = this.nns;
    }
    if (this.qual) {
      opt['qual'] = this.qual;
    }
    if (this.etype) {
      opt['etype'] = this.etype;
    }
    if (this.pscrn) {
      opt['pscrn'] = this.pscrn;
    }
    if (this.fapprox) {
      opt['fapprox'] = this.fapprox;
    }

    addFilter(this.ffmpeg, {
      filter: 'nnedi',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.nnedi = nnedi;
