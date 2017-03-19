const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the flite function.
 *
 *
 * @example
 *  ffmpeg().flite()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the flite function.
 */
function flite(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'flite', function() {
    return new FliteFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FliteFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Flite.prototype.withList_voices = list_voices;
    Flite.prototype.withNb_samples = nb_samples;
    Flite.prototype.withTextfile = textfile;
    Flite.prototype.withText = text;
    Flite.prototype.withVoice = voice;
  }

  /**
   * If set to 1, list the names of the available voices and exit
   * immediately. Default value is 0.
   * 
   * 
   * @param val
   */
  list_voices(val) {
    this.list_voices = val;
    return this;
  }

  /**
   * Set the maximum number of samples per frame. Default value is 512.
   * 
   * 
   * @param val
   */
  nb_samples(val) {
    this.nb_samples = val;
    return this;
  }

  /**
   * Set the filename containing the text to speak.
   * 
   * 
   * @param val
   */
  textfile(val) {
    this.textfile = val;
    return this;
  }

  /**
   * Set the text to speak.
   * 
   * 
   * @param val
   */
  text(val) {
    this.text = val;
    return this;
  }

  /**
   * Set the voice to use for the speech synthesis. Default value is
   * kal. See also the list_voices option.
   * 
   * @param val
   */
  voice(val) {
    this.voice = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.list_voices) {
      opt.list_voices = this.list_voices;
    }
    if (this.nb_samples) {
      opt.nb_samples = this.nb_samples;
    }
    if (this.textfile) {
      opt.textfile = this.textfile;
    }
    if (this.text) {
      opt.text = this.text;
    }
    if (this.voice) {
      opt.voice = this.voice;
    }

    addFilter(this.ffmpeg, {
      filter: 'flite',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.flite = flite;
