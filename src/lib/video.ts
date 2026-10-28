import type { VideoHTMLAttributes } from "react";

/**
 * Discourage casual downloading of our videos: no "Download" in the player
 * menu, no right-click "Save video as…", no picture-in-picture/casting, no
 * dragging the video out. (Nothing on the web can fully stop a determined
 * person — e.g. screen recording — which is why the videos also carry a
 * burned-in logo watermark.)
 */
export const VIDEO_PROTECT: VideoHTMLAttributes<HTMLVideoElement> = {
  controlsList: "nodownload noplaybackrate noremoteplayback",
  disablePictureInPicture: true,
  disableRemotePlayback: true,
  draggable: false,
  onContextMenu: (e) => e.preventDefault(),
};
