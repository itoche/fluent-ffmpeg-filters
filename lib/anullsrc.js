const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the anullsrc function.
 *
 *
 * @example
 *  ffmpeg().anullsrc()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the anullsrc function.
 */
function anullsrc(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'anullsrc', function() {
    return new AnullsrcFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class AnullsrcFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    AnullsrcFilter.prototype.withChannel_layout = this.channel_layout;
    AnullsrcFilter.prototype.withSample_rate = this.sample_rate;
    AnullsrcFilter.prototype.withNb_samples = this.nb_samples;
  }

  /**
   * 
   * Specifies the channel layout, and can be either an integer or a string
   * representing a channel layout. The default value of channel_layout
   * is &quot;stereo&quot;.
   * 
   * Check the channel_layout_map definition in
   * libavutil/channel_layout.c for the mapping between strings and
   * channel layout values.
   * 
   * 
   * @param val
   */
  channel_layout(val) {
    this.channel_layout = val;
    return this;
  }

  /**
   * Specifies the sample rate, and defaults to 44100.
   * 
   * 
   * @param val
   */
  sample_rate(val) {
    this.sample_rate = val;
    return this;
  }

  /**
   * Set the number of samples per requested frames.
   * 
   * 
   * @param val
   */
  nb_samples(val) {
    this.nb_samples = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.channel_layout) {
      opt['channel_layout'] = this.channel_layout;
    }
    if (this.sample_rate) {
      opt['sample_rate'] = this.sample_rate;
    }
    if (this.nb_samples) {
      opt['nb_samples'] = this.nb_samples;
    }

    addFilter(this.ffmpeg, {
      filter: 'anullsrc',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.anullsrc = anullsrc;
