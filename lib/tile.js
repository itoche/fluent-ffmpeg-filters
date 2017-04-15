const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the tile function.
 *
 *
 * @example
 *  ffmpeg().tile()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the tile function.
 */
function tile(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'tile', function() {
    return new TileFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class TileFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    TileFilter.prototype.withLayout = layout;
    TileFilter.prototype.withNb_frames = nb_frames;
    TileFilter.prototype.withMargin = margin;
    TileFilter.prototype.withPadding = padding;
    TileFilter.prototype.withColor = color;
  }

  /**
   * Set the grid size (i.e. the number of lines and columns). For the syntax of
   * this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * 
   * 
   * @param val
   */
  layout(val) {
    this.layout = val;
    return this;
  }

  /**
   * Set the maximum number of frames to render in the given area. It must be less
   * than or equal to wxh. The default value is 0, meaning all
   * the area will be used.
   * 
   * 
   * @param val
   */
  nb_frames(val) {
    this.nb_frames = val;
    return this;
  }

  /**
   * Set the outer border margin in pixels.
   * 
   * 
   * @param val
   */
  margin(val) {
    this.margin = val;
    return this;
  }

  /**
   * Set the inner border thickness (i.e. the number of pixels between frames). For
   * more advanced padding options (such as having different values for the edges),
   * refer to the pad video filter.
   * 
   * 
   * @param val
   */
  padding(val) {
    this.padding = val;
    return this;
  }

  /**
   * Specify the color of the unused area. For the syntax of this option, check the
   * &quot;Color&quot; section in the ffmpeg-utils manual. The default value of color
   * is &quot;black&quot;.
   * 
   * @param val
   */
  color(val) {
    this.color = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.layout) {
      opt['layout'] = this.layout;
    }
    if (this.nb_frames) {
      opt['nb_frames'] = this.nb_frames;
    }
    if (this.margin) {
      opt['margin'] = this.margin;
    }
    if (this.padding) {
      opt['padding'] = this.padding;
    }
    if (this.color) {
      opt['color'] = this.color;
    }

    addFilter(this.ffmpeg, {
      filter: 'tile',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.tile = tile;
