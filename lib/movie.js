const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the movie function.
 *
 *
 * @example
 *  ffmpeg().movie()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the movie function.
 */
function movie(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'movie', function() {
    return new MovieFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class MovieFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Movie.prototype.withFilename = filename;
    Movie.prototype.withFormat_name = format_name;
    Movie.prototype.withSeek_point = seek_point;
    Movie.prototype.withStreams = streams;
    Movie.prototype.withStream_index = stream_index;
    Movie.prototype.withLoop = loop;
    Movie.prototype.withDiscontinuity = discontinuity;
  }

  /**
   * The name of the resource to read (not necessarily a file; it can also be a
   * device or a stream accessed through some protocol).
   * 
   * 
   * @param val
   */
  filename(val) {
    this.filename = val;
    return this;
  }

  /**
   * Specifies the format assumed for the movie to read, and can be either
   * the name of a container or an input device. If not specified, the
   * format is guessed from movie_name or by probing.
   * 
   * 
   * @param val
   */
  format_name(val) {
    this.format_name = val;
    return this;
  }

  /**
   * Specifies the seek point in seconds. The frames will be output
   * starting from this seek point. The parameter is evaluated with
   * av_strtod, so the numerical value may be suffixed by an IS
   * postfix. The default value is &quot;0&quot;.
   * 
   * 
   * @param val
   */
  seek_point(val) {
    this.seek_point = val;
    return this;
  }

  /**
   * Specifies the streams to read. Several streams can be specified,
   * separated by &quot;+&quot;. The source will then have as many outputs, in the
   * same order. The syntax is explained in the “Stream specifiers”
   * section in the ffmpeg manual. Two special names, &quot;dv&quot; and &quot;da&quot; specify
   * respectively the default (best suited) video and audio stream. Default
   * is &quot;dv&quot;, or &quot;da&quot; if the filter is called as &quot;amovie&quot;.
   * 
   * 
   * @param val
   */
  streams(val) {
    this.streams = val;
    return this;
  }

  /**
   * Specifies the index of the video stream to read. If the value is -1,
   * the most suitable video stream will be automatically selected. The default
   * value is &quot;-1&quot;. Deprecated. If the filter is called &quot;amovie&quot;, it will select
   * audio instead of video.
   * 
   * 
   * @param val
   */
  stream_index(val) {
    this.stream_index = val;
    return this;
  }

  /**
   * Specifies how many times to read the stream in sequence.
   * If the value is 0, the stream will be looped infinitely.
   * Default value is &quot;1&quot;.
   * 
   * Note that when the movie is looped the source timestamps are not
   * changed, so it will generate non monotonically increasing timestamps.
   * 
   * 
   * @param val
   */
  loop(val) {
    this.loop = val;
    return this;
  }

  /**
   * Specifies the time difference between frames above which the point is
   * considered a timestamp discontinuity which is removed by adjusting the later
   * timestamps.
   * 
   * @param val
   */
  discontinuity(val) {
    this.discontinuity = val;
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
    if (this.format_name) {
      opt['format_name'] = this.format_name;
    }
    if (this.seek_point) {
      opt['seek_point'] = this.seek_point;
    }
    if (this.streams) {
      opt['streams'] = this.streams;
    }
    if (this.stream_index) {
      opt['stream_index'] = this.stream_index;
    }
    if (this.loop) {
      opt['loop'] = this.loop;
    }
    if (this.discontinuity) {
      opt['discontinuity'] = this.discontinuity;
    }

    addFilter(this.ffmpeg, {
      filter: 'movie',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.movie = movie;
