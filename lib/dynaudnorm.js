const addFilter = require('./utils').addFilter;
const registerFilter = require('./utils').registerFilter;

/**
 * Augment FfmpegCommand with the dynaudnorm function.
 *
 *
 * @example
 *  ffmpeg().dynaudnorm()
      ...             // call filter configuration functions
 *    .build()        // end filter configuration
 *    ...
 *    .applyFilters() // called once all filters have been configured
 *
 * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
 * @return {FfmpegCommand} The ffmpegCommand augmented with the dynaudnorm function.
 */
function dynaudnorm(ffmpegCommand) {
  registerFilter(ffmpegCommand, 'dynaudnorm', function() {
    return new DynaudnormFilter(this);
  });
  return ffmpegCommand;
}

/**
 * Class exposing methods to configure the vstack filter in a builder pattern way.
 *
 * See {@link http://ffmpeg.org/ffmpeg-filters.html#vstack} for a description
 * of each configuration option.
 */
class DynaudnormFilter {
  /**
   * @param  {FfmpegCommand} ffmpegCommand The fluent-ffmpeg constructor.
   */
  constructor (ffmpeg) {
    this.ffmpeg = ffmpeg;
    Dynaudnorm.prototype.withF = f;
    Dynaudnorm.prototype.withG = g;
    Dynaudnorm.prototype.withP = p;
    Dynaudnorm.prototype.withM = m;
    Dynaudnorm.prototype.withR = r;
    Dynaudnorm.prototype.withN = n;
    Dynaudnorm.prototype.withC = c;
    Dynaudnorm.prototype.withB = b;
    Dynaudnorm.prototype.withS = s;
  }

  /**
   * Set the frame length in milliseconds. In range from 10 to 8000 milliseconds.
   * Default is 500 milliseconds.
   * The Dynamic Audio Normalizer processes the input audio in small chunks,
   * referred to as frames. This is required, because a peak magnitude has no
   * meaning for just a single sample value. Instead, we need to determine the
   * peak magnitude for a contiguous sequence of sample values. While a &quot;standard&quot;
   * normalizer would simply use the peak magnitude of the complete file, the
   * Dynamic Audio Normalizer determines the peak magnitude individually for each
   * frame. The length of a frame is specified in milliseconds. By default, the
   * Dynamic Audio Normalizer uses a frame length of 500 milliseconds, which has
   * been found to give good results with most files.
   * Note that the exact frame length, in number of samples, will be determined
   * automatically, based on the sampling rate of the individual input audio file.
   * 
   * 
   * @param val
   */
  f(val) {
    this.f = val;
    return this;
  }

  /**
   * Set the Gaussian filter window size. In range from 3 to 301, must be odd
   * number. Default is 31.
   * Probably the most important parameter of the Dynamic Audio Normalizer is the
   * window size of the Gaussian smoothing filter. The filter’s window size
   * is specified in frames, centered around the current frame. For the sake of
   * simplicity, this must be an odd number. Consequently, the default value of 31
   * takes into account the current frame, as well as the 15 preceding frames and
   * the 15 subsequent frames. Using a larger window results in a stronger
   * smoothing effect and thus in less gain variation, i.e. slower gain
   * adaptation. Conversely, using a smaller window results in a weaker smoothing
   * effect and thus in more gain variation, i.e. faster gain adaptation.
   * In other words, the more you increase this value, the more the Dynamic Audio
   * Normalizer will behave like a &quot;traditional&quot; normalization filter. On the
   * contrary, the more you decrease this value, the more the Dynamic Audio
   * Normalizer will behave like a dynamic range compressor.
   * 
   * 
   * @param val
   */
  g(val) {
    this.g = val;
    return this;
  }

  /**
   * Set the target peak value. This specifies the highest permissible magnitude
   * level for the normalized audio input. This filter will try to approach the
   * target peak magnitude as closely as possible, but at the same time it also
   * makes sure that the normalized signal will never exceed the peak magnitude.
   * A frame’s maximum local gain factor is imposed directly by the target peak
   * magnitude. The default value is 0.95 and thus leaves a headroom of 5%*.
   * It is not recommended to go above this value.
   * 
   * 
   * @param val
   */
  p(val) {
    this.p = val;
    return this;
  }

  /**
   * Set the maximum gain factor. In range from 1.0 to 100.0. Default is 10.0.
   * The Dynamic Audio Normalizer determines the maximum possible (local) gain
   * factor for each input frame, i.e. the maximum gain factor that does not
   * result in clipping or distortion. The maximum gain factor is determined by
   * the frame’s highest magnitude sample. However, the Dynamic Audio Normalizer
   * additionally bounds the frame’s maximum gain factor by a predetermined
   * (global) maximum gain factor. This is done in order to avoid excessive gain
   * factors in &quot;silent&quot; or almost silent frames. By default, the maximum gain
   * factor is 10.0, For most inputs the default value should be sufficient and
   * it usually is not recommended to increase this value. Though, for input
   * with an extremely low overall volume level, it may be necessary to allow even
   * higher gain factors. Note, however, that the Dynamic Audio Normalizer does
   * not simply apply a &quot;hard&quot; threshold (i.e. cut off values above the threshold).
   * Instead, a &quot;sigmoid&quot; threshold function will be applied. This way, the
   * gain factors will smoothly approach the threshold value, but never exceed that
   * value.
   * 
   * 
   * @param val
   */
  m(val) {
    this.m = val;
    return this;
  }

  /**
   * Set the target RMS. In range from 0.0 to 1.0. Default is 0.0 - disabled.
   * By default, the Dynamic Audio Normalizer performs &quot;peak&quot; normalization.
   * This means that the maximum local gain factor for each frame is defined
   * (only) by the frame’s highest magnitude sample. This way, the samples can
   * be amplified as much as possible without exceeding the maximum signal
   * level, i.e. without clipping. Optionally, however, the Dynamic Audio
   * Normalizer can also take into account the frame’s root mean square,
   * abbreviated RMS. In electrical engineering, the RMS is commonly used to
   * determine the power of a time-varying signal. It is therefore considered
   * that the RMS is a better approximation of the &quot;perceived loudness&quot; than
   * just looking at the signal’s peak magnitude. Consequently, by adjusting all
   * frames to a constant RMS value, a uniform &quot;perceived loudness&quot; can be
   * established. If a target RMS value has been specified, a frame’s local gain
   * factor is defined as the factor that would result in exactly that RMS value.
   * Note, however, that the maximum local gain factor is still restricted by the
   * frame’s highest magnitude sample, in order to prevent clipping.
   * 
   * 
   * @param val
   */
  r(val) {
    this.r = val;
    return this;
  }

  /**
   * Enable channels coupling. By default is enabled.
   * By default, the Dynamic Audio Normalizer will amplify all channels by the same
   * amount. This means the same gain factor will be applied to all channels, i.e.
   * the maximum possible gain factor is determined by the &quot;loudest&quot; channel.
   * However, in some recordings, it may happen that the volume of the different
   * channels is uneven, e.g. one channel may be &quot;quieter&quot; than the other one(s).
   * In this case, this option can be used to disable the channel coupling. This way,
   * the gain factor will be determined independently for each channel, depending
   * only on the individual channel’s highest magnitude sample. This allows for
   * harmonizing the volume of the different channels.
   * 
   * 
   * @param val
   */
  n(val) {
    this.n = val;
    return this;
  }

  /**
   * Enable DC bias correction. By default is disabled.
   * An audio signal (in the time domain) is a sequence of sample values.
   * In the Dynamic Audio Normalizer these sample values are represented in the
   * -1.0 to 1.0 range, regardless of the original input format. Normally, the
   * audio signal, or &quot;waveform&quot;, should be centered around the zero point.
   * That means if we calculate the mean value of all samples in a file, or in a
   * single frame, then the result should be 0.0 or at least very close to that
   * value. If, however, there is a significant deviation of the mean value from
   * 0.0, in either positive or negative direction, this is referred to as a
   * DC bias or DC offset. Since a DC bias is clearly undesirable, the Dynamic
   * Audio Normalizer provides optional DC bias correction.
   * With DC bias correction enabled, the Dynamic Audio Normalizer will determine
   * the mean value, or &quot;DC correction&quot; offset, of each input frame and subtract
   * that value from all of the frame’s sample values which ensures those samples
   * are centered around 0.0 again. Also, in order to avoid &quot;gaps&quot; at the frame
   * boundaries, the DC correction offset values will be interpolated smoothly
   * between neighbouring frames.
   * 
   * 
   * @param val
   */
  c(val) {
    this.c = val;
    return this;
  }

  /**
   * Enable alternative boundary mode. By default is disabled.
   * The Dynamic Audio Normalizer takes into account a certain neighbourhood
   * around each frame. This includes the preceding frames as well as the
   * subsequent frames. However, for the &quot;boundary&quot; frames, located at the very
   * beginning and at the very end of the audio file, not all neighbouring
   * frames are available. In particular, for the first few frames in the audio
   * file, the preceding frames are not known. And, similarly, for the last few
   * frames in the audio file, the subsequent frames are not known. Thus, the
   * question arises which gain factors should be assumed for the missing frames
   * in the &quot;boundary&quot; region. The Dynamic Audio Normalizer implements two modes
   * to deal with this situation. The default boundary mode assumes a gain factor
   * of exactly 1.0 for the missing frames, resulting in a smooth &quot;fade in&quot; and
   * &quot;fade out&quot; at the beginning and at the end of the input, respectively.
   * 
   * 
   * @param val
   */
  b(val) {
    this.b = val;
    return this;
  }

  /**
   * Set the compress factor. In range from 0.0 to 30.0. Default is 0.0.
   * By default, the Dynamic Audio Normalizer does not apply &quot;traditional&quot;
   * compression. This means that signal peaks will not be pruned and thus the
   * full dynamic range will be retained within each local neighbourhood. However,
   * in some cases it may be desirable to combine the Dynamic Audio Normalizer’s
   * normalization algorithm with a more &quot;traditional&quot; compression.
   * For this purpose, the Dynamic Audio Normalizer provides an optional compression
   * (thresholding) function. If (and only if) the compression feature is enabled,
   * all input frames will be processed by a soft knee thresholding function prior
   * to the actual normalization process. Put simply, the thresholding function is
   * going to prune all samples whose magnitude exceeds a certain threshold value.
   * However, the Dynamic Audio Normalizer does not simply apply a fixed threshold
   * value. Instead, the threshold value will be adjusted for each individual
   * frame.
   * In general, smaller parameters result in stronger compression, and vice versa.
   * Values below 3.0 are not recommended, because audible distortion may appear.
   * 
   * @param val
   */
  s(val) {
    this.s = val;
    return this;
  }


  /**
   * Creates this filter configuration and registers it in the ffmpeg instance.
   * @return {ffmpegCommand} The ffmpeg instance.
   */
  build() {
    let opt = {};
    if (this.f) {
      opt.f = this.f;
    }
    if (this.g) {
      opt.g = this.g;
    }
    if (this.p) {
      opt.p = this.p;
    }
    if (this.m) {
      opt.m = this.m;
    }
    if (this.r) {
      opt.r = this.r;
    }
    if (this.n) {
      opt.n = this.n;
    }
    if (this.c) {
      opt.c = this.c;
    }
    if (this.b) {
      opt.b = this.b;
    }
    if (this.s) {
      opt.s = this.s;
    }

    addFilter(this.ffmpeg, {
      filter: 'dynaudnorm',
      options: opt
    });
    return this.ffmpeg;
  }
}

module.exports.dynaudnorm = dynaudnorm;
