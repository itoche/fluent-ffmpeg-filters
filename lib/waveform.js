const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the waveform function.
 *
 *
 * @example
 *  ffmpeg().waveform()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the waveform function.
 */
function waveform(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'waveform', function() {
    return new WaveformFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class WaveformFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    WaveformFilter.prototype.withMode = this.mode;
    WaveformFilter.prototype.withIntensity = this.intensity;
    WaveformFilter.prototype.withMirror = this.mirror;
    WaveformFilter.prototype.withDisplay = this.display;
    WaveformFilter.prototype.withComponents = this.components;
    WaveformFilter.prototype.withEnvelope = this.envelope;
    WaveformFilter.prototype.withFilter = this.filter;
    WaveformFilter.prototype.withGraticule = this.graticule;
    WaveformFilter.prototype.withOpacity = this.opacity;
    WaveformFilter.prototype.withFlags = this.flags;
    WaveformFilter.prototype.withScale = this.scale;
    WaveformFilter.prototype.withBgopacity = this.bgopacity;
  }

  /**
   * Can be either row, or column. Default is column.
   * In row mode, the graph on the left side represents color component value 0 and
   * the right side represents value &#x3D; 255. In column mode, the top side represents
   * color component value &#x3D; 0 and bottom side represents value &#x3D; 255.
   * 
   * 
   * @param val
   */
  mode(val) {
    this._mode = val;
    return this;
  }

  /**
   * Set intensity. Smaller values are useful to find out how many values of the same
   * luminance are distributed across input rows/columns.
   * Default value is 0.04. Allowed range is [0, 1].
   * 
   * 
   * @param val
   */
  intensity(val) {
    this._intensity = val;
    return this;
  }

  /**
   * Set mirroring mode. 0 means unmirrored, 1 means mirrored.
   * In mirrored mode, higher values will be represented on the left
   * side for row mode and at the top for column mode. Default is
   * 1 (mirrored).
   * 
   * 
   * @param val
   */
  mirror(val) {
    this._mirror = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  display(val) {
    this._display = val;
    return this;
  }

  /**
   * Set which color components to display. Default is 1, which means only luminance
   * or red color component if input is in RGB colorspace. If is set for example to
   * 7 it will display all 3 (if) available color components.
   * 
   * 
   * @param val
   */
  components(val) {
    this._components = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  envelope(val) {
    this._envelope = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  filter(val) {
    this._filter = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  graticule(val) {
    this._graticule = val;
    return this;
  }

  /**
   * Set graticule opacity.
   * 
   * 
   * @param val
   */
  opacity(val) {
    this._opacity = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  flags(val) {
    this._flags = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  scale(val) {
    this._scale = val;
    return this;
  }

  /**
   * Set background opacity.
   * 
   * @param val
   */
  bgopacity(val) {
    this._bgopacity = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._mode) {
      opt['mode'] = this._mode;
    }
    if (this._intensity) {
      opt['intensity'] = this._intensity;
    }
    if (this._mirror) {
      opt['mirror'] = this._mirror;
    }
    if (this._display) {
      opt['display'] = this._display;
    }
    if (this._components) {
      opt['components'] = this._components;
    }
    if (this._envelope) {
      opt['envelope'] = this._envelope;
    }
    if (this._filter) {
      opt['filter'] = this._filter;
    }
    if (this._graticule) {
      opt['graticule'] = this._graticule;
    }
    if (this._opacity) {
      opt['opacity'] = this._opacity;
    }
    if (this._flags) {
      opt['flags'] = this._flags;
    }
    if (this._scale) {
      opt['scale'] = this._scale;
    }
    if (this._bgopacity) {
      opt['bgopacity'] = this._bgopacity;
    }

    addFilter(this.ffmpeg, {
      filter: 'waveform',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.waveform = waveform;
