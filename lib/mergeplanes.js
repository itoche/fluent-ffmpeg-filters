const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the mergeplanes function.
 *
 *
 * @example
 *  ffmpeg().mergeplanes()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the mergeplanes function.
 */
function mergeplanes(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'mergeplanes', function() {
    return new MergeplanesFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class MergeplanesFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    MergeplanesFilter.prototype.withMapping = mapping;
    MergeplanesFilter.prototype.withFormat = format;
  }

  /**
   * Set input to output plane mapping. Default is 0.
   * 
   * The mappings is specified as a bitmap. It should be specified as a
   * hexadecimal number in the form 0xAa[Bb[Cc[Dd]]]. ’Aa’ describes the
   * mapping for the first plane of the output stream. ’A’ sets the number of
   * the input stream to use (from 0 to 3), and ’a’ the plane number of the
   * corresponding input to use (from 0 to 3). The rest of the mappings is
   * similar, ’Bb’ describes the mapping for the output stream second
   * plane, ’Cc’ describes the mapping for the output stream third plane and
   * ’Dd’ describes the mapping for the output stream fourth plane.
   * 
   * 
   * @param val
   */
  mapping(val) {
    this.mapping = val;
    return this;
  }

  /**
   * Set output pixel format. Default is yuva444p.
   * 
   * @param val
   */
  format(val) {
    this.format = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.mapping) {
      opt['mapping'] = this.mapping;
    }
    if (this.format) {
      opt['format'] = this.format;
    }

    addFilter(this.ffmpeg, {
      filter: 'mergeplanes',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.mergeplanes = mergeplanes;
