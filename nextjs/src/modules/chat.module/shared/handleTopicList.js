import { getTopicsTree } from '../../../common/lib/chat'
import { ChatUserRole } from './constants'

export const makeTopicsTree = (topics) => {
  let list = JSON.parse(JSON.stringify(topics))

  let map = {}, roots = []
  list.forEach((topic, idx) => {
    map[topic.id] = idx
    list[idx].children = []
  })

  list.forEach((topic,  idx) => {
    let node = list[idx]
    node.checked = false
    if (node.parentId)
    {
      list[map[node.parentId]].children.push(node)
    }
    else {
      roots.push(node)
    }
  })

  return roots
}

export const getTopicList = async (data) =>
{
  let reqData = {
    topicId: data.topicId,
    roomId: data.roomId,
    categoryId: data.categoryId,
    userId: data.userId,
    roleId: data.roleId,
  }

  let res = await getTopicsTree(reqData)
  if (!res|| !res.topics)
    return

  let topics = makeTopicsTree(res.topics)

  return topics
}
