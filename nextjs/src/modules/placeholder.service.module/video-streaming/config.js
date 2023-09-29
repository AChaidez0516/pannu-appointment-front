export const use_dataChannel = true;
/**
 * Ordered, reliable: { "ordered": true }
 * Unordered, no retransmissions: { "ordered": false, maxRetransmits: 0 }
 * Unordered, 500ms lifetime: { "ordered": false, maxRetransmits: 500 }
 */
export const dataChannel = { "ordered": true };

export const use_audio = false;
/**
 * Default: default
 * Opus: opus/48000/2
 * PCMU: PCMU/8000
 * PCMA: PCMA/8000
 */
export const audio_codec = "default"

export const use_video = true;
/**
 * Default resolution
 * 320x240
 * 640x480
 * 960x540
 * 1280x720
 */
export const video_resolution = '640x480';
/**
 * No transform: none
 * Edge Detection: edge
 * Cartoon Effect: cartoon
 * Rotate: rotate
 */
export const video_transform = 'face'
/**
 * Default codecs: default
 * VP8: VP8/90000
 * H264: H264/90000
 */
export const video_codec = 'H264/90000'

export const use_STUN = false;
