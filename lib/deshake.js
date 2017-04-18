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
    DeshakeFilter.prototype.withX = this.x;
    DeshakeFilter.prototype.withY = this.y;
    DeshakeFilter.prototype.withW = this.w;
    DeshakeFilter.prototype.withH = this.h;
    DeshakeFilter.prototype.withRx = this.rx;
    DeshakeFilter.prototype.withRy = this.ry;
    DeshakeFilter.prototype.withEdge = this.edge;
    DeshakeFilter.prototype.withBlocksize = this.blocksize;
    DeshakeFilter.prototype.withContrast = this.contrast;
    DeshakeFilter.prototype.withSearch = this.search;
    DeshakeFilter.prototype.withFilename = this.filename;
    DeshakeFilter.prototype.withOpencl = this.opencl;
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
  x(val) {
    this._x = val;
    return this;
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
  y(val) {
    this._y = val;
    return this;
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
  w(val) {
    this._w = val;
    return this;
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
    this._h = val;
    return this;
  }

  /**
   * Specify the maximum extent of movement in x and y directions in the
   * range 0-64 pixels. Default 16.
   * 
   * 
   * @param val
   */
  rx(val) {
    this._rx = val;
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
    this._ry = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  edge(val) {
    this._edge = val;
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
    this._blocksize = val;
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
    this._contrast = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  search(val) {
    this._search = val;
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
    this._filename = val;
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
    this._opencl = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._x) {
      opt['x'] = this._x;
    }
    if (this._y) {
      opt['y'] = this._y;
    }
    if (this._w) {
      opt['w'] = this._w;
    }
    if (this._h) {
      opt['h'] = this._h;
    }
    if (this._rx) {
      opt['rx'] = this._rx;
    }
    if (this._ry) {
      opt['ry'] = this._ry;
    }
    if (this._edge) {
      opt['edge'] = this._edge;
    }
    if (this._blocksize) {
      opt['blocksize'] = this._blocksize;
    }
    if (this._contrast) {
      opt['contrast'] = this._contrast;
    }
    if (this._search) {
      opt['search'] = this._search;
    }
    if (this._filename) {
      opt['filename'] = this._filename;
    }
    if (this._opencl) {
      opt['opencl'] = this._opencl;
    }

    addFilter(this.ffmpeg, {
      filter: 'deshake',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.deshake = deshake;
