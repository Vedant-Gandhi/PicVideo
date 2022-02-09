import axios from "axios";
import config from "./NetworkConfig"
const IMAGE_ORIENTATION={
    LANDSCAPE:"landscape",
    POTRAIT:"potrait",
    SQUARE:"square"
}
const IMAGE_SIZES = {
    LARGE:"large",
    MEDIUM:"medium",
    SMALL:"small"
}
/**
 * 
 * @param {String} keyword The keyword based on which the results will be returned
 * @param {Object} data 
 * @param {IMAGE_ORIENTATION} data.orientation 
 * @param {IMAGE_SIZES} data.size 
 * @param {Number} data.page The page number to get 
 * @param {Number} data.per_page The page size.Default is 30.
 */
async function getImages(keyword,data)
{
try {
    const result=await axios.get(`${config.PEXEL_API_DOMAINS.IMAGE_SEARCH}`,{
        headers:{
            Authorization:config.API_KEY
        },
        params:{
            query:keyword,
            page:1,
            per_page:data?.per_page || 30,
            size:data?.size || IMAGE_SIZES.MEDIUM,
            orientation:data?.orientation || IMAGE_ORIENTATION.POTRAIT
        }
    });

    return Promise.resolve(result.data)
} catch (error) {
    return Promise.reject(error)
}
}


/**
 * 
 * @param {String} keyword The keyword based on which the results will be returned
 * @param {Object} data 
 * @param {IMAGE_ORIENTATION} data.orientation 
 * @param {IMAGE_SIZES} data.size 
 * @param {Number} data.page The page number to get 
 * @param {Number} data.per_page The page size.Default is 30.
 */
 async function getVideos(keyword,data)
 {
 try {
     const result=await axios.get(`${config.PEXEL_API_DOMAINS.VIDEO_SEARCH}`,{
         headers:{
             Authorization:config.API_KEY
         },
         params:{
             query:keyword,
             page:1,
             per_page:data?.per_page || 30,
             size:data?.size || IMAGE_SIZES.MEDIUM,
             orientation:data?.orientation || IMAGE_ORIENTATION.POTRAIT
         }
     });
 
     return Promise.resolve(result.data)
 } catch (error) {
     return Promise.reject(error)
 }
 }
 
export default {getImages,getVideos}