const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the flite function.
 *
 *
 * @example
 *  ffmpeg().flite()
 *    ...             // call filter configuration functions
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
    FliteFilter.prototype.withList_voices = this.list_voices;
    FliteFilter.prototype.withNb_samples = this.nb_samples;
    FliteFilter.prototype.withTextfile = this.textfile;
    FliteFilter.prototype.withText = this.text;
    FliteFilter.prototype.withVoice = this.voice;
  }

  /**
   * If set to 1, list the names of the available voices and exit
   * immediately. Default value is 0.
   * 
   * 
   * @param val
   */
  list_voices(val) {
    this._list_voices = val;
    return this;
  }

  /**
   * Set the maximum number of samples per frame. Default value is 512.
   * 
   * 
   * @param val
   */
  nb_samples(val) {
    this._nb_samples = val;
    return this;
  }

  /**
   * Set the filename containing the text to speak.
   * 
   * 
   * @param val
   */
  textfile(val) {
    this._textfile = val;
    return this;
  }

  /**
   * Set the text to speak.
   * 
   * 
   * @param val
   */
  text(val) {
    this._text = val;
    return this;
  }

  /**
   * Set the voice to use for the speech synthesis. Default value is
   * kal. See also the list_voices option.
   * 
   * @param val
   */
  voice(val) {
    this._voice = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._list_voices) {
      opt['list_voices'] = this._list_voices;
    }
    if (this._nb_samples) {
      opt['nb_samples'] = this._nb_samples;
    }
    if (this._textfile) {
      opt['textfile'] = this._textfile;
    }
    if (this._text) {
      opt['text'] = this._text;
    }
    if (this._voice) {
      opt['voice'] = this._voice;
    }

    addFilter(this.ffmpeg, {
      filter: 'flite',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.flite = flite;
