import React from "react";
import { ThemeStoreContext,themeColors } from "../../Context/Theme";
import style from "./HolderContainer.module.css";

import PropTypes from 'prop-types'
function HolderContainer({ video, src, videoWidth, videoHeight, videoPreview }) {

  const themeState=ThemeStoreContext()

  return (
    <article className={style.root}>
      {video ? (
        <video
        crossOrigin="anonymous"
        controls
          autoPlay={false}
          className={`${style.videoPlayer} ${(themeState?.state === themeColors.DARK) ? style.darkCard : ""}`}
          poster={videoPreview}
          width={videoWidth}
          height={videoHeight}
          name="media"
        >
          <source src={src} type="video/mp4"></source>
        </video>
      ) : (
        <img src={src}   className={`${style.internal} ${(themeState?.state === themeColors.DARK) ? style.darkCard : ""}`}/>
      )}
    </article>
  );
}

HolderContainer.propTypes = {
  video:PropTypes.bool,
  src:PropTypes.string,
  videoWidth: PropTypes.number,
  videoHeight: PropTypes.number,
  onClick:PropTypes.func
}
export default HolderContainer;
