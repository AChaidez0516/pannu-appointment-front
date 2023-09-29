import { FILE_SERVER_URL, ResultStatus } from '../constant/global'

import {
  getPreSignedURLFrom,
  getResponseOCRServer,
} from '../lib/provider'

const uploadFile = async (file) => {
  const formData = new FormData()

  formData.append('operations', '{"query":"mutation($file:Upload!) {singleUploadFile(file: $file){status, filename}}"}')
  formData.append('map', '{"0": ["variables.file"]}')
  formData.append('0', file)

  const axios = (await import('axios')).default
  const res = await axios.post('https://appointment.pannucorp.com/uploads/graphql', formData)
  const ret = res.data.data.singleUploadFile

  if (ret.status == ResultStatus.SUCCESS)
    return `${FILE_SERVER_URL}/uploads/${ret.filename}`

  return ''
}
export const handleOCR = async (fileFront, fileBack) => {
  try {
    // upload file
    const [frontFileUrl, backFileUrl] = await Promise.all([
      uploadFile(fileFront),
      uploadFile(fileBack)
    ])

    if (frontFileUrl.length == 0 || backFileUrl.length == 0) {
      throw 'file upload is failed.'
    }

    //const frontFileUrl = 'https://appointment.pannucorp.com/uploads/l4d4v2tecq0kceno7fe_img_3250 - Copy.jpg'
    //const backFileUrl = 'https://appointment.pannucorp.com/uploads/l4d4v2tg3bi86odajiz_img_3256.jpg'

    // step-3: send image url into registration server
    const responseOCR = await getResponseOCRServer(
        frontFileUrl,
        backFileUrl
    )

    return { responseOCR, frontFileUrl, backFileUrl }

  }
  catch (error) {
    console.log("fetching from registration: ", error)
    return { responseOCR: null, frontFileUrl: '', backFileUrl: '' }
  }
}

export function getFileNameFrom(file) {
  // you can change file name so that it will be unique
  return file?.name;
}