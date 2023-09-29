import { getPreSignedURLFrom, getResponseSelfie } from "../lib/provider"
import { 
  getFileNameFrom, 
} from "./handleOCR"


export const handleOCR = async (videoFile, imageFile) => {
  try {
    // extract file name
    const videoFileName = getFileNameFrom(videoFile)
    const imageFileName = getFileNameFrom(imageFile) 

      // step-1: get the preSignedURL from registration server
      const [videoUrl, imageUrl] = await Promise.all([
        getPreSignedURLFrom(videoFileName),
        getPreSignedURLFrom(imageFileName)
      ]) 

      if(!responseFront.status || !responseBack.status) {
        throw "aws is not working correctly"
      }

      const videoUrlToAWS = videoUrl.message
      const imageUrlToAws = imageUrl.message

      // step-2: upload files into aws
      await Promise.all([
        fetch(videoUrlToAWS, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: videoFile
        }),
        fetch(imageUrlToAws, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: imageFile
        })
      ])

      // step-3: upload image url into registration server
      const responseSelfie = await getResponseSelfie(
        videoUrlToAWS.split('?')[0], 
        imageUrlToAws.split('?')[0]
      ) 
      console.log({responseSelfie});
      return responseSelfie;
      
    } catch (error) {
      console.log("fetching from registration: ", error)
    }
}
