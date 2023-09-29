import { getMessages, getLastUnreadMessages, getFirstUnreadMessages } from '../../../common/lib/chat';

const getFakeMessage = () => {
  let list = []

  for (let i = 100; i >= 1; i--) {
    list.push(
      {
        "id": i,
        "parentId": null, "topicId": 531, "avatarUrl": "", "userName": "Chunzuo Wang",
        "createdBy": 1,
        "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"" + i + "\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
        "path": "Inpatient notes,Inpatient notes - 1",
        "category": "",
        "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": "2022-08-05T21:53:31",
        "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
      }
    )
  }
  return { success: true, messages: list }
}

const MockMessages = { success: true, messages: [
  {
    "id": 1071, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": "2022-08-05T21:53:31",
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1072, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": "2022-08-05T21:53:31",
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1073, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": null,
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1074, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": "2022-08-05T21:53:31",
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1075, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": "2022-08-05T21:53:31",
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1076, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": null,
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1077, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": "2022-08-05T21:53:31",
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1078, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": "2022-08-05T21:53:31",
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1079, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": null,
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1080, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": "2022-08-05T21:53:31",
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1081, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": "2022-08-05T21:53:31",
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1082, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": null,
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1083, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": "2022-08-05T21:53:31",
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },
  {
    "id": 1084, "parentId": 1070, "topicId": 531, "avatarUrl": "", "userName": "Zhicheng Tang",
    "createdBy": 2,
    "content": "{\"blocks\":[{\"key\":\"7086s\",\"text\":\"My birthday is Jan 12, 2022 and My SSN is 234-54-2343 and Shyam's phone number is 345-325-2345. I'm from USA.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "path": "Inpatient notes,Inpatient notes - 1", "category": "",
    "audioFileUrl": "", "audioFileName": "", "audioFileType": "", "audioFileSize": 0, "duration": 0, "readAt": "2022-08-05T21:53:31",
    "followedAt": "2022-08-09T17:32:09", "createdAt": "2022-08-05T21:53:31", "updatedAt": "2022-08-05T21:53:31", "deletedAt": null,
  },

]}

export const getMessageList = async (reqData) => {
  // const res = await getMessages(reqData)
  let messages = getFakeMessage().messages.filter((v, idx) => {
    if (reqData.boundId == 0) {
      return idx < reqData.count
    }
    else {
      if (reqData.direction == 1) {
        return v.id > reqData.boundId
      }
      else {
        return v.id < reqData.boundId
      }
    }
  } )

  if (reqData.direction != 1)
    messages = messages.filter((v, idx) => idx < reqData.count)
  else
    messages = messages.reverse().filter((v, idx) => idx < reqData.count).reverse()
  const res = { success: true,
    messages: messages }

  if (!res || !res.success)
    return null

  let list = makeMessageTree(res.messages.reverse())
  console.log(list)
  return list
}

export const getOldUnreadMessage = async (reqData) => {
  const res = await getFirstUnreadMessages(reqData)
  if (!res || !res.success)
    return null

  let list = makeMessageTree(res.messages.reverse())
  console.log(list)
  return list
}

export const getLastUnreadMessage = async (reqData) => {
  const res = await getLastUnreadMessages(reqData)
  if (!res || !res.success)
    return null

  let list = makeMessageTree(res.messages.reverse())
  console.log(list)
  return list
}

const makeMessageTree = (messages) => {
  let list = JSON.parse(JSON.stringify(messages))

  let map = {}, roots = []
  list.forEach((message, idx) => {
    map[message.id] = idx
    list[idx].children = []
    if (message.parentId)
      list[idx].showed = false
  })

  list.forEach((message,  idx) => {
    let node = list[idx]

    if (node.parentId)
    {
      list[map[node.parentId]].children.push(node)
      if (list[map[node.parentId]].children.length == 1) {
        list[map[node.parentId]].showed = true
      }
    }
    else {
      roots.push(node)
    }
  })

  return roots
}

// const messageProc = (messages) => {
//   let list = []
//   messages?.forEach((v) => {
//     let n = {...v}
//
//     n.loadMore = false
//
//     if (n.children && n.children.length > 0) {
//       let new_ = messageProc(n.children)
//       n.children = [ ...new_ ]
//       n.loadMore = new_.length > 1
//     }
//
//     list.push({ ...n })
//   })
//
//   return list
// }

const parseInlineStyle = (ranges) => {
  let styles = { fontWeight: 'normal', fontStyle: 'normal', fontSize: 12 };
  ranges.forEach(v => {
    switch (v.style) {
      case 'BOLD':
        styles.fontWeight = 'bold'
        break;
      case 'ITALIC':
        styles.fontStyle = 'italic'
        break;
      case 'FS1':
        styles.fontSize = 16
        break;
    }
  })

  return styles
}

const getBlockText = (contentData, blockIdx) => {
  let text = contentData.blocks[blockIdx].text

  const entityRanges = contentData.blocks[blockIdx].entityRanges

  let startIdx = 0
  let textBlocks = []
  for (let i = 0; i < entityRanges.length; i++) {
    const range = entityRanges[i]
    const key = range.key
    const entityData = contentData.entityMap[key]
    if (entityData.type != 'mention')
      continue

    const offset = range.offset
    const length = range.length

    textBlocks.push({ type: 0, text: text.substr(startIdx, offset - startIdx) })

    let s = text.substr(offset, length)
    if (s.indexOf('@') == 0)
      s = s.substr(1, s.length)
    textBlocks.push({ type: 1, text: s })

    startIdx = offset + length
  }

  textBlocks.push({ type: 0, text: text.substr(startIdx, text.length - startIdx) })

  text = ''
  textBlocks.forEach(v => {
    if (v.type == 1) {
      text += `<span style="display: inline-block; position: relative; color: #0065FB; cursor: pointer; background-color: #B6D3FF;padding: 2px 2px 2px 22px;"><span style="position: absolute; left:3px; top: 58%; transform: translateY(-50%)"><Image width="18" height="18" layout="fixed" src="/assets/icons/mention.png" /></span><span style="display: inline-block;line-height: 22px;">${v.text}</span></span>`
    }
    else {
      text += v.text
    }
  })

  return (
    <div style={{ margin: '1px 0' }} dangerouslySetInnerHTML={{ __html: text }}></div>
  )
}

export const parseContentMessage = (content) => {
  try {
    const contentObj = JSON.parse(content)
    return (
      contentObj.blocks.map((block, idx) => {
        const inlineStyleRanges = block.inlineStyleRanges
        const inlineStyle = parseInlineStyle(inlineStyleRanges)
        switch (block.type) {
          case 'unordered-list-item':
            return (
              <ul key={idx}>
                <li style={inlineStyle}>{getBlockText(contentObj, idx)}</li>
              </ul>
            )
            break;
          case 'ordered-list-item':
            return (
              <ol key={idx}>
                <li style={inlineStyle}>{getBlockText(contentObj, idx)}</li>
              </ol>
            )
            break;
          case 'code-block':
            return (
              <pre key={idx} style={inlineStyle}>{getBlockText(contentObj, idx)}</pre>
            )
            break;
          case 'unstyled':
            return (
              <div key={idx} style={inlineStyle}>{getBlockText(contentObj, idx)}</div>
            )
            break;
        }
      })
    )
  }
  catch (e) {
    return content
  }
}