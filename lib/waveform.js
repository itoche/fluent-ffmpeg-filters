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
    WaveformFilter.prototype.withMode = mode;
    WaveformFilter.prototype.withIntensity = intensity;
    WaveformFilter.prototype.withMirror = mirror;
    WaveformFilter.prototype.withDisplay = display;
    WaveformFilter.prototype.withComponents = components;
    WaveformFilter.prototype.withEnvelope = envelope;
    WaveformFilter.prototype.withFilter = filter;
    WaveformFilter.prototype.withGraticule = graticule;
    WaveformFilter.prototype.withOpacity = opacity;
    WaveformFilter.prototype.withFlags = flags;
    WaveformFilter.prototype.withScale = scale;
    WaveformFilter.prototype.withBgopacity = bgopacity;
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
    this.mode = val;
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
    this.intensity = val;
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
    this.mirror = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  display(val) {
    this.display = val;
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
    this.components = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  envelope(val) {
    this.envelope = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  filter(val) {
    this.filter = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  graticule(val) {
    this.graticule = val;
    return this;
  }

  /**
   * Set graticule opacity.
   * 
   * 
   * @param val
   */
  opacity(val) {
    this.opacity = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  flags(val) {
    this.flags = val;
    return this;
  }

  /**
   * 
   * @param val
   */
  scale(val) {
    this.scale = val;
    return this;
  }

  /**
   * Set background opacity.
   * 
   * @param val
   */
  bgopacity(val) {
    this.bgopacity = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.mode) {
      opt['mode'] = this.mode;
    }
    if (this.intensity) {
      opt['intensity'] = this.intensity;
    }
    if (this.mirror) {
      opt['mirror'] = this.mirror;
    }
    if (this.display) {
      opt['display'] = this.display;
    }
    if (this.components) {
      opt['components'] = this.components;
    }
    if (this.envelope) {
      opt['envelope'] = this.envelope;
    }
    if (this.filter) {
      opt['filter'] = this.filter;
    }
    if (this.graticule) {
      opt['graticule'] = this.graticule;
    }
    if (this.opacity) {
      opt['opacity'] = this.opacity;
    }
    if (this.flags) {
      opt['flags'] = this.flags;
    }
    if (this.scale) {
      opt['scale'] = this.scale;
    }
    if (this.bgopacity) {
      opt['bgopacity'] = this.bgopacity;
    }

    addFilter(this.ffmpeg, {
      filter: 'waveform',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.waveform = waveform;
