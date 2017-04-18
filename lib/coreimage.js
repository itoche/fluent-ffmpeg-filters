const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the coreimage function.
 *
 *
 * @example
 *  ffmpeg().coreimage()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the coreimage function.
 */
function coreimage(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'coreimage', function() {
    return new CoreimageFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class CoreimageFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    CoreimageFilter.prototype.withList_filters = this.list_filters;
    CoreimageFilter.prototype.withFilter = this.filter;
    CoreimageFilter.prototype.withOutput_rect = this.output_rect;
  }

  /**
   * List all available filters and generators along with all their respective
   * options as well as possible minimum and maximum values along with the default
   * values.
   * 
   * list_filters&#x3D;true
   * 
   * 
   * 
   * @param val
   */
  list_filters(val) {
    this._list_filters = val;
    return this;
  }

  /**
   * Specify all filters by their respective name and options.
   * Use list_filters to determine all valid filter names and options.
   * Numerical options are specified by a float value and are automatically clamped
   * to their respective value range.  Vector and color options have to be specified
   * by a list of space separated float values. Character escaping has to be done.
   * A special option name default is available to use default options for a
   * filter.
   * 
   * It is required to specify either default or at least one of the filter options.
   * All omitted options are used with their default values.
   * The syntax of the filter string is as follows:
   * 
   * filter&#x3D;&lt;NAME&gt;@&lt;OPTION&gt;&#x3D;&lt;VALUE&gt;[@&lt;OPTION&gt;&#x3D;&lt;VALUE&gt;][@...][#&lt;NAME&gt;@&lt;OPTION&gt;&#x3D;&lt;VALUE&gt;[@&lt;OPTION&gt;&#x3D;&lt;VALUE&gt;][@...]][#...]
   * 
   * 
   * 
   * @param val
   */
  filter(val) {
    this._filter = val;
    return this;
  }

  /**
   * Specify a rectangle where the output of the filter chain is copied into the
   * input image. It is given by a list of space separated float values:
   * 
   * output_rect&#x3D;x\ y\ width\ height
   * 
   * If not given, the output rectangle equals the dimensions of the input image.
   * The output rectangle is automatically cropped at the borders of the input
   * image. Negative values are valid for each component.
   * 
   * output_rect&#x3D;25\ 25\ 100\ 100
   * 
   * 
   * @param val
   */
  output_rect(val) {
    this._output_rect = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._list_filters) {
      opt['list_filters'] = this._list_filters;
    }
    if (this._filter) {
      opt['filter'] = this._filter;
    }
    if (this._output_rect) {
      opt['output_rect'] = this._output_rect;
    }

    addFilter(this.ffmpeg, {
      filter: 'coreimage',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.coreimage = coreimage;
