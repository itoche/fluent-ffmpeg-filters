const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the adrawgraph function.
 *
 *
 * @example
 *  ffmpeg().adrawgraph()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the adrawgraph function.
 */
function adrawgraph(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'adrawgraph', function() {
    return new AdrawgraphFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AdrawgraphFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AdrawgraphFilter.prototype.withM1 = this.m1;
    AdrawgraphFilter.prototype.withFg1 = this.fg1;
    AdrawgraphFilter.prototype.withM2 = this.m2;
    AdrawgraphFilter.prototype.withFg2 = this.fg2;
    AdrawgraphFilter.prototype.withM3 = this.m3;
    AdrawgraphFilter.prototype.withFg3 = this.fg3;
    AdrawgraphFilter.prototype.withM4 = this.m4;
    AdrawgraphFilter.prototype.withFg4 = this.fg4;
    AdrawgraphFilter.prototype.withMin = this.min;
    AdrawgraphFilter.prototype.withMax = this.max;
    AdrawgraphFilter.prototype.withBg = this.bg;
    AdrawgraphFilter.prototype.withMode = this.mode;
    AdrawgraphFilter.prototype.withSlide = this.slide;
    AdrawgraphFilter.prototype.withSize = this.size;
  }

  /**
   * Set 1st frame metadata key from which metadata values will be used to draw a graph.
   * 
   * 
   * @param val
   */
  m1(val) {
    this._m1 = val;
    return this;
  }

  /**
   * Set 1st foreground color expression.
   * 
   * 
   * @param val
   */
  fg1(val) {
    this._fg1 = val;
    return this;
  }

  /**
   * Set 2nd frame metadata key from which metadata values will be used to draw a graph.
   * 
   * 
   * @param val
   */
  m2(val) {
    this._m2 = val;
    return this;
  }

  /**
   * Set 2nd foreground color expression.
   * 
   * 
   * @param val
   */
  fg2(val) {
    this._fg2 = val;
    return this;
  }

  /**
   * Set 3rd frame metadata key from which metadata values will be used to draw a graph.
   * 
   * 
   * @param val
   */
  m3(val) {
    this._m3 = val;
    return this;
  }

  /**
   * Set 3rd foreground color expression.
   * 
   * 
   * @param val
   */
  fg3(val) {
    this._fg3 = val;
    return this;
  }

  /**
   * Set 4th frame metadata key from which metadata values will be used to draw a graph.
   * 
   * 
   * @param val
   */
  m4(val) {
    this._m4 = val;
    return this;
  }

  /**
   * Set 4th foreground color expression.
   * 
   * 
   * @param val
   */
  fg4(val) {
    this._fg4 = val;
    return this;
  }

  /**
   * Set minimal value of metadata value.
   * 
   * 
   * @param val
   */
  min(val) {
    this._min = val;
    return this;
  }

  /**
   * Set maximal value of metadata value.
   * 
   * 
   * @param val
   */
  max(val) {
    this._max = val;
    return this;
  }

  /**
   * Set graph background color. Default is white.
   * 
   * 
   * @param val
   */
  bg(val) {
    this._bg = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this._mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  slide(val) {
    this._slide = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  size(val) {
    this._size = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._m1) {
      opt['m1'] = this._m1;
    }
    if (this._fg1) {
      opt['fg1'] = this._fg1;
    }
    if (this._m2) {
      opt['m2'] = this._m2;
    }
    if (this._fg2) {
      opt['fg2'] = this._fg2;
    }
    if (this._m3) {
      opt['m3'] = this._m3;
    }
    if (this._fg3) {
      opt['fg3'] = this._fg3;
    }
    if (this._m4) {
      opt['m4'] = this._m4;
    }
    if (this._fg4) {
      opt['fg4'] = this._fg4;
    }
    if (this._min) {
      opt['min'] = this._min;
    }
    if (this._max) {
      opt['max'] = this._max;
    }
    if (this._bg) {
      opt['bg'] = this._bg;
    }
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._slide) {
      opt['slide'] = this._slide;
    }
    if (this._size) {
      opt['size'] = this._size;
    }

    addFilter(this.ffmpeg, {
      filter: 'adrawgraph',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.adrawgraph = adrawgraph;
