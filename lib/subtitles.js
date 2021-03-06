const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the subtitles function.
 *
 *
 * @example
 *  ffmpeg().subtitles()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the subtitles function.
 */
function subtitles(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'subtitles', function() {
    return new SubtitlesFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class SubtitlesFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    SubtitlesFilter.prototype.withFilename = this.filename;
    SubtitlesFilter.prototype.withOriginal_size = this.original_size;
    SubtitlesFilter.prototype.withFontsdir = this.fontsdir;
    SubtitlesFilter.prototype.withCharenc = this.charenc;
    SubtitlesFilter.prototype.withStream_index = this.stream_index;
    SubtitlesFilter.prototype.withForce_style = this.force_style;
  }

  /**
   * Set the filename of the subtitle file to read. It must be specified.
   * 
   * 
   * @param val
   */
  filename(val) {
    this._filename = val;
    return this;
  }

  /**
   * Specify the size of the original video, the video for which the ASS file
   * was composed. For the syntax of this option, check the
   * (ffmpeg-utils)&quot;Video size&quot; section in the ffmpeg-utils manual.
   * Due to a misdesign in ASS aspect ratio arithmetic, this is necessary to
   * correctly scale the fonts if the aspect ratio has been changed.
   * 
   * 
   * @param val
   */
  original_size(val) {
    this._original_size = val;
    return this;
  }

  /**
   * Set a directory path containing fonts that can be used by the filter.
   * These fonts will be used in addition to whatever the font provider uses.
   * 
   * 
   * @param val
   */
  fontsdir(val) {
    this._fontsdir = val;
    return this;
  }

  /**
   * Set subtitles input character encoding. subtitles filter only. Only
   * useful if not UTF-8.
   * 
   * 
   * @param val
   */
  charenc(val) {
    this._charenc = val;
    return this;
  }

  /**
   * Set subtitles stream index. subtitles filter only.
   * 
   * 
   * @param val
   */
  stream_index(val) {
    this._stream_index = val;
    return this;
  }

  /**
   * Override default style or script info parameters of the subtitles. It accepts a
   * string containing ASS style format KEY&#x3D;VALUE couples separated by &quot;,&quot;.
   * 
   * @param val
   */
  force_style(val) {
    this._force_style = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this._filename) {
      opt['filename'] = this._filename;
    }
    if (this._original_size) {
      opt['original_size'] = this._original_size;
    }
    if (this._fontsdir) {
      opt['fontsdir'] = this._fontsdir;
    }
    if (this._charenc) {
      opt['charenc'] = this._charenc;
    }
    if (this._stream_index) {
      opt['stream_index'] = this._stream_index;
    }
    if (this._force_style) {
      opt['force_style'] = this._force_style;
    }

    addFilter(this.ffmpeg, {
      filter: 'subtitles',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.subtitles = subtitles;
