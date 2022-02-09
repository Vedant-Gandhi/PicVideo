import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import SearchBar from "../Components/SearchBar/SearchBar";
import FilterLabel from "../Components/FilterLabel/FilterLabel";
import HolderContainer from "../Components/HolderContainers/HolderContainer";

import apiCalls from "../API/Pexels";

import { SpinnerDotted } from "spinners-react";

import notFoundImage from "../assets/images/not-found.svg";
import { themeColors, ThemeStoreContext } from "../Context/Theme";

import dayIcon from '../assets/icons/day_black.svg'
import nightIcon from '../assets/icons/night_black.svg'

/**
 * 
 * @description The root page which displays the landing page of the website
 */
function Home() {

  /**
   * @description Stores different types of filters
   * @namespace
   * @property {object} IMAGE - The filter as Image
   * @property {String} IMAGE.text - The human readable text for IMAGE filter
   * @property {Number} IMAGE.key - The unique ID to identify the filter
   * 
   * @property {Object} VIDEO - The filter as Image
   * @property {String} VIDEO.text - The human readable text for VIDEO filter
   * @property {Number} VIDEO.key - The unique ID to identify the filter
   */
  const filters = {
    
    IMAGE: { text: "Image", key: 0 },
    VIDEO: { text: "Video", key: 1 },
  };


  /**
   * 
   * @param {UIEvent} evt 
   * @param {Number} key - The unique key to identify the filter
   * @description Toggles the filter state based on the key
   */
  const onFilterChange = (evt, key) => {
    updateFilter(key);
    updatesearchQuery("");
    updateData(null)
  };
  const [currentFilter, updateFilter] = useState(filters.IMAGE.key);
  const [data, updateData] = useState(null);
  const [searchQuery, updatesearchQuery] = useState("");
  const [isLoading, updateisLoading] = useState(false);

  const themeState=ThemeStoreContext()

  const onSearchButton = async () => {
    updateisLoading(true);
    updateData([]);
    switch (currentFilter) {
      case filters.IMAGE.key:
        try {
          const result = await apiCalls.getImages(searchQuery);
          updateData(result.photos);
        } catch (error) {
          console.error(error);
        }
        break;
      case filters.VIDEO.key:
        try {
          const result = await apiCalls.getVideos(searchQuery);
          updateData(result.videos);
        } catch (error) {
          console.error(error);
        }
        break;
    }
    updateisLoading(false);
  };


  return (
    <section className={`${style.root} ${themeState?.state === themeColors.DARK && style.darkRoot}`}>
      <div className={`${style.uppersection} ${themeState?.state === themeColors.DARK && style.darkUpperSection}`}>
        <div className={style.titleWrapper}>
          <h1>PicVideo</h1>
          <p>Search Videos and Photos using Pexels API</p>
        </div>

        <div className={style.filterWrapper}>
          <SearchBar
            placeholder="Enter a keyword"
            onClick={onSearchButton}
            onChange={updatesearchQuery}
            value={searchQuery}
          ></SearchBar>
          <div className={style.gap}></div>
          <img src={themeState?.state === themeColors.DARK ? dayIcon : nightIcon} onClick={themeState.toggleTheme} className={style.icon} />
        </div>

        <div className={style.gap}></div>

        <div className={style.filterWrapper}>
          <p className={style.lookingText}>What are you looking for?</p>
          <div className={style.gap}></div>

          <FilterLabel
            text={filters.IMAGE.text}
            key_={filters.IMAGE.key}
            selected={currentFilter === filters.IMAGE.key}
            onClick={onFilterChange}
          ></FilterLabel>

          <div className={style.gap}></div>

          <FilterLabel
            text={filters.VIDEO.text}
            key_={filters.VIDEO.key}
            selected={currentFilter === filters.VIDEO.key}
            onClick={onFilterChange}
          ></FilterLabel>
        </div>
      </div>

      <div className={style.lowersection}>
        <SpinnerDotted
          enabled={isLoading}
          size={50}
          thickness={123}
          speed={126}
          color="rgba(57, 172, 166, 1)"
        />

        {Array.isArray(data) && data?.length === 0 && !isLoading && (
          <section className={style.errorDiv}>
            {" "}
            <img src={notFoundImage} alt="" /> <p style={themeState.state === themeColors.DARK ? {transition:"all",transitionDuration:"300ms"}:{}}>Oops Nothing Found!</p>{" "}
          </section>
        )}

        {data?.map((element) => (
          <>
  
            <HolderContainer
              src={
                currentFilter === filters.VIDEO.key
                  ? element?.video_files?.filter((val)=>val?.width == 640 && val?.height == 360)?.[0]?.link
                  : element?.src?.medium
              }
              video={currentFilter === filters.VIDEO.key}
              videoPreview={element?.video_pictures?.[0]?.picture}
              videoHeight={180}
              videoWidth={320}
            ></HolderContainer>
           
          </>
        ))}
      </div>
    </section>
  );
}
export default Home;
