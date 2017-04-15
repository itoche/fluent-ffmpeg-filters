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
    AdrawgraphFilter.prototype.withM1 = m1;
    AdrawgraphFilter.prototype.withFg1 = fg1;
    AdrawgraphFilter.prototype.withM2 = m2;
    AdrawgraphFilter.prototype.withFg2 = fg2;
    AdrawgraphFilter.prototype.withM3 = m3;
    AdrawgraphFilter.prototype.withFg3 = fg3;
    AdrawgraphFilter.prototype.withM4 = m4;
    AdrawgraphFilter.prototype.withFg4 = fg4;
    AdrawgraphFilter.prototype.withMin = min;
    AdrawgraphFilter.prototype.withMax = max;
    AdrawgraphFilter.prototype.withBg = bg;
    AdrawgraphFilter.prototype.withMode = mode;
    AdrawgraphFilter.prototype.withSlide = slide;
    AdrawgraphFilter.prototype.withSize = size;
  }

  /**
   * Set 1st frame metadata key from which metadata values will be used to draw a graph.
   * 
   * 
   * @param val
   */
  m1(val) {
    this.m1 = val;
    return this;
  }

  /**
   * Set 1st foreground color expression.
   * 
   * 
   * @param val
   */
  fg1(val) {
    this.fg1 = val;
    return this;
  }

  /**
   * Set 2nd frame metadata key from which metadata values will be used to draw a graph.
   * 
   * 
   * @param val
   */
  m2(val) {
    this.m2 = val;
    return this;
  }

  /**
   * Set 2nd foreground color expression.
   * 
   * 
   * @param val
   */
  fg2(val) {
    this.fg2 = val;
    return this;
  }

  /**
   * Set 3rd frame metadata key from which metadata values will be used to draw a graph.
   * 
   * 
   * @param val
   */
  m3(val) {
    this.m3 = val;
    return this;
  }

  /**
   * Set 3rd foreground color expression.
   * 
   * 
   * @param val
   */
  fg3(val) {
    this.fg3 = val;
    return this;
  }

  /**
   * Set 4th frame metadata key from which metadata values will be used to draw a graph.
   * 
   * 
   * @param val
   */
  m4(val) {
    this.m4 = val;
    return this;
  }

  /**
   * Set 4th foreground color expression.
   * 
   * 
   * @param val
   */
  fg4(val) {
    this.fg4 = val;
    return this;
  }

  /**
   * Set minimal value of metadata value.
   * 
   * 
   * @param val
   */
  min(val) {
    this.min = val;
    return this;
  }

  /**
   * Set maximal value of metadata value.
   * 
   * 
   * @param val
   */
  max(val) {
    this.max = val;
    return this;
  }

  /**
   * Set graph background color. Default is white.
   * 
   * 
   * @param val
   */
  bg(val) {
    this.bg = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  mode(val) {
    this.mode = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  slide(val) {
    this.slide = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.m1) {
      opt['m1'] = this.m1;
    }
    if (this.fg1) {
      opt['fg1'] = this.fg1;
    }
    if (this.m2) {
      opt['m2'] = this.m2;
    }
    if (this.fg2) {
      opt['fg2'] = this.fg2;
    }
    if (this.m3) {
      opt['m3'] = this.m3;
    }
    if (this.fg3) {
      opt['fg3'] = this.fg3;
    }
    if (this.m4) {
      opt['m4'] = this.m4;
    }
    if (this.fg4) {
      opt['fg4'] = this.fg4;
    }
    if (this.min) {
      opt['min'] = this.min;
    }
    if (this.max) {
      opt['max'] = this.max;
    }
    if (this.bg) {
      opt['bg'] = this.bg;
    }
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.slide) {
      opt['slide'] = this.slide;
    }
    if (this.size) {
      opt['size'] = this.size;
    }

    addFilter(this.ffmpeg, {
      filter: 'adrawgraph',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.adrawgraph = adrawgraph;
