const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the life function.
 *
 *
 * @example
 *  ffmpeg().life()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the life function.
 */
function life(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'life', function() {
    return new LifeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class LifeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Life.prototype.withFilename = filename;
    Life.prototype.withRate = rate;
    Life.prototype.withRandom_fill_ratio = random_fill_ratio;
    Life.prototype.withRandom_seed = random_seed;
    Life.prototype.withRule = rule;
    Life.prototype.withSize = size;
    Life.prototype.withStitch = stitch;
    Life.prototype.withMold = mold;
    Life.prototype.withLife_color = life_color;
    Life.prototype.withDeath_color = death_color;
    Life.prototype.withMold_color = mold_color;
  }

  /**
   * Set the file from which to read the initial grid state. In the file,
   * each non-whitespace character is considered an alive cell, and newline
   * is used to delimit the end of each row.
   * 
   * If this option is not specified, the initial grid is generated
   * randomly.
   * 
   * 
   * @param val
   */
  filename(val) {
    this.filename = val;
    return this;
  }

  /**
   * Set the video rate, that is the number of frames generated per second.
   * Default is 25.
   * 
   * 
   * @param val
   */
  rate(val) {
    this.rate = val;
    return this;
  }

  /**
   * Set the random fill ratio for the initial random grid. It is a
   * floating point number value ranging from 0 to 1, defaults to 1/PHI.
   * It is ignored when a file is specified.
   * 
   * 
   * @param val
   */
  random_fill_ratio(val) {
    this.random_fill_ratio = val;
    return this;
  }

  /**
   * Set the seed for filling the initial random grid, must be an integer
   * included between 0 and UINT32_MAX. If not specified, or if explicitly
   * set to -1, the filter will try to use a good random seed on a best
   * effort basis.
   * 
   * 
   * @param val
   */
  random_seed(val) {
    this.random_seed = val;
    return this;
  }

  /**
   * Set the life rule.
   * 
   * A rule can be specified with a code of the kind &quot;SNS/BNB&quot;,
   * where NS and NB are sequences of numbers in the range 0-8,
   * NS specifies the number of alive neighbor cells which make a
   * live cell stay alive, and NB the number of alive neighbor cells
   * which make a dead cell to become alive (i.e. to &quot;born&quot;).
   * &quot;s&quot; and &quot;b&quot; can be used in place of &quot;S&quot; and &quot;B&quot;, respectively.
   * 
   * Alternatively a rule can be specified by an 18-bits integer. The 9
   * high order bits are used to encode the next cell state if it is alive
   * for each number of neighbor alive cells, the low order bits specify
   * the rule for &quot;borning&quot; new cells. Higher order bits encode for an
   * higher number of neighbor cells.
   * For example the number 6153 &#x3D; (12&lt;&lt;9)+9 specifies a stay alive
   * rule of 12 and a born rule of 9, which corresponds to &quot;S23/B03&quot;.
   * 
   * Default value is &quot;S23/B3&quot;, which is the original Conway’s game of life
   * rule, and will keep a cell alive if it has 2 or 3 neighbor alive
   * cells, and will born a new cell if there are three alive cells around
   * a dead cell.
   * 
   * 
   * @param val
   */
  rule(val) {
    this.rule = val;
    return this;
  }

  /**
   * Set the size of the output video. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * 
   * If filename is specified, the size is set by default to the
   * same size of the input file. If size is set, it must contain
   * the size specified in the input file, and the initial grid defined in
   * that file is centered in the larger resulting area.
   * 
   * If a filename is not specified, the size value defaults to &quot;320x240&quot;
   * (used for a randomly generated initial grid).
   * 
   * 
   * @param val
   */
  size(val) {
    this.size = val;
    return this;
  }

  /**
   * If set to 1, stitch the left and right grid edges together, and the
   * top and bottom edges also. Defaults to 1.
   * 
   * 
   * @param val
   */
  stitch(val) {
    this.stitch = val;
    return this;
  }

  /**
   * Set cell mold speed. If set, a dead cell will go from death_color to
   * mold_color with a step of mold. mold can have a
   * value from 0 to 255.
   * 
   * 
   * @param val
   */
  mold(val) {
    this.mold = val;
    return this;
  }

  /**
   * Set the color of living (or new born) cells.
   * 
   * 
   * @param val
   */
  life_color(val) {
    this.life_color = val;
    return this;
  }

  /**
   * Set the color of dead cells. If mold is set, this is the first color
   * used to represent a dead cell.
   * 
   * 
   * @param val
   */
  death_color(val) {
    this.death_color = val;
    return this;
  }

  /**
   * Set mold color, for definitely dead and moldy cells.
   * 
   * For the syntax of these 3 color options, check the &quot;Color&quot; section in the
   * ffmpeg-utils manual.
   * 
   * @param val
   */
  mold_color(val) {
    this.mold_color = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.filename) {
      opt['filename'] = this.filename;
    }
    if (this.rate) {
      opt['rate'] = this.rate;
    }
    if (this.random_fill_ratio) {
      opt['random_fill_ratio'] = this.random_fill_ratio;
    }
    if (this.random_seed) {
      opt['random_seed'] = this.random_seed;
    }
    if (this.rule) {
      opt['rule'] = this.rule;
    }
    if (this.size) {
      opt['size'] = this.size;
    }
    if (this.stitch) {
      opt['stitch'] = this.stitch;
    }
    if (this.mold) {
      opt['mold'] = this.mold;
    }
    if (this.life_color) {
      opt['life_color'] = this.life_color;
    }
    if (this.death_color) {
      opt['death_color'] = this.death_color;
    }
    if (this.mold_color) {
      opt['mold_color'] = this.mold_color;
    }

    addFilter(this.ffmpeg, {
      filter: 'life',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.life = life;
