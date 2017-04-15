const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the deshake function.
 *
 *
 * @example
 *  ffmpeg().deshake()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the deshake function.
 */
function deshake(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'deshake', function() {
    return new DeshakeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DeshakeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    DeshakeFilter.prototype.withH = h;
    DeshakeFilter.prototype.withRy = ry;
    DeshakeFilter.prototype.withEdge = edge;
    DeshakeFilter.prototype.withBlocksize = blocksize;
    DeshakeFilter.prototype.withContrast = contrast;
    DeshakeFilter.prototype.withSearch = search;
    DeshakeFilter.prototype.withFilename = filename;
    DeshakeFilter.prototype.withOpencl = opencl;
  }

  /**
   * Specify a rectangular area where to limit the search for motion
   * vectors.
   * If desired the search for motion vectors can be limited to a
   * rectangular area of the frame defined by its top left corner, width
   * and height. These parameters have the same meaning as the drawbox
   * filter which can be used to visualise the position of the bounding
   * box.
   * 
   * This is useful when simultaneous movement of subjects within the frame
   * might be confused for camera motion by the motion vector search.
   * 
   * If any or all of x, y, w and h are set to -1
   * then the full frame is used. This allows later options to be set
   * without specifying the bounding box for the motion vector search.
   * 
   * Default - search the whole frame.
   * 
   * 
   * @param val
   */
  h(val) {
    this.h = val;
    return this;
  }

  /**
   * Specify the maximum extent of movement in x and y directions in the
   * range 0-64 pixels. Default 16.
   * 
   * 
   * @param val
   */
  ry(val) {
    this.ry = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  edge(val) {
    this.edge = val;
    return this;
  }

  /**
   * Specify the blocksize to use for motion search. Range 4-128 pixels,
   * default 8.
   * 
   * 
   * @param val
   */
  blocksize(val) {
    this.blocksize = val;
    return this;
  }

  /**
   * Specify the contrast threshold for blocks. Only blocks with more than
   * the specified contrast (difference between darkest and lightest
   * pixels) will be considered. Range 1-255, default 125.
   * 
   * 
   * @param val
   */
  contrast(val) {
    this.contrast = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  search(val) {
    this.search = val;
    return this;
  }

  /**
   * If set then a detailed log of the motion search is written to the
   * specified file.
   * 
   * 
   * @param val
   */
  filename(val) {
    this.filename = val;
    return this;
  }

  /**
   * If set to 1, specify using OpenCL capabilities, only available if
   * FFmpeg was configured with --enable-opencl. Default value is 0.
   * 
   * 
   * @param val
   */
  opencl(val) {
    this.opencl = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.h) {
      opt['h'] = this.h;
    }
    if (this.ry) {
      opt['ry'] = this.ry;
    }
    if (this.edge) {
      opt['edge'] = this.edge;
    }
    if (this.blocksize) {
      opt['blocksize'] = this.blocksize;
    }
    if (this.contrast) {
      opt['contrast'] = this.contrast;
    }
    if (this.search) {
      opt['search'] = this.search;
    }
    if (this.filename) {
      opt['filename'] = this.filename;
    }
    if (this.opencl) {
      opt['opencl'] = this.opencl;
    }

    addFilter(this.ffmpeg, {
      filter: 'deshake',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.deshake = deshake;
