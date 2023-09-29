import { FILE_SERVER_URL, ResultStatus } from '../constant/global'

import {
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
    return `${FILE_SERVER_URL}/static/${ret.filename}`

  return ''
}
export const handleMultiFileUpload = async (files) => {
  try {
    const pathList = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const path = await uploadFile(file)
      pathList.push(path)
    }

    return pathList
  }
  catch (error) {
    console.log("fetching from registration: ", error)
    return { responseOCR: null, frontFileUrl: '', backFileUrl: '' }
  }
}
