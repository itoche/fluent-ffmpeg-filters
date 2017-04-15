const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the fade function.
 *
 *
 * @example
 *  ffmpeg().fade()
 *    ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the fade function.
 */
function fade(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'fade', function() {
    return new FadeFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class FadeFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    FadeFilter.prototype.withType = type;
    FadeFilter.prototype.withStart_frame = start_frame;
    FadeFilter.prototype.withNb_frames = nb_frames;
    FadeFilter.prototype.withAlpha = alpha;
    FadeFilter.prototype.withStart_time = start_time;
    FadeFilter.prototype.withDuration = duration;
    FadeFilter.prototype.withColor = color;
  }

  /**
   * The effect type can be either &quot;in&quot; for a fade-in, or &quot;out&quot; for a fade-out
   * effect.
   * Default is in.
   * 
   * 
   * @param val
   */
  type(val) {
    this.type = val;
    return this;
  }

  /**
   * Specify the number of the frame to start applying the fade
   * effect at. Default is 0.
   * 
   * 
   * @param val
   */
  start_frame(val) {
    this.start_frame = val;
    return this;
  }

  /**
   * The number of frames that the fade effect lasts. At the end of the
   * fade-in effect, the output video will have the same intensity as the input video.
   * At the end of the fade-out transition, the output video will be filled with the
   * selected color.
   * Default is 25.
   * 
   * 
   * @param val
   */
  nb_frames(val) {
    this.nb_frames = val;
    return this;
  }

  /**
   * If set to 1, fade only alpha channel, if one exists on the input.
   * Default value is 0.
   * 
   * 
   * @param val
   */
  alpha(val) {
    this.alpha = val;
    return this;
  }

  /**
   * Specify the timestamp (in seconds) of the frame to start to apply the fade
   * effect. If both start_frame and start_time are specified, the fade will start at
   * whichever comes last.  Default is 0.
   * 
   * 
   * @param val
   */
  start_time(val) {
    this.start_time = val;
    return this;
  }

  /**
   * The number of seconds for which the fade effect has to last. At the end of the
   * fade-in effect the output video will have the same intensity as the input video,
   * at the end of the fade-out transition the output video will be filled with the
   * selected color.
   * If both duration and nb_frames are specified, duration is used. Default is 0
   * (nb_frames is used by default).
   * 
   * 
   * @param val
   */
  duration(val) {
    this.duration = val;
    return this;
  }

  /**
   * Specify the color of the fade. Default is &quot;black&quot;.
   * 
   * @param val
   */
  color(val) {
    this.color = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.type) {
      opt['type'] = this.type;
    }
    if (this.start_frame) {
      opt['start_frame'] = this.start_frame;
    }
    if (this.nb_frames) {
      opt['nb_frames'] = this.nb_frames;
    }
    if (this.alpha) {
      opt['alpha'] = this.alpha;
    }
    if (this.start_time) {
      opt['start_time'] = this.start_time;
    }
    if (this.duration) {
      opt['duration'] = this.duration;
    }
    if (this.color) {
      opt['color'] = this.color;
    }

    addFilter(this.ffmpeg, {
      filter: 'fade',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.fade = fade;
