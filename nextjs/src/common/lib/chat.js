import client from './apollo'
import { gql, useQuery } from '@apollo/client'

export async function login(email, password, role) {
  const GET_USERS = gql`
    query login($email: String, $password: String, $roleId: Int) @api(name: chatting) {
      login(credentials: {
        email: $email
        password: $password
        roleId: $roleId
      }) {
        id,
        name,
        email,
        userId,
        roles {
          id,
          name  
        },
        currentRoleId,
        avatarUrl,
        createdAt,
        updatedAt,
        deletedAt,
        success,
        msg
      }
    }
  `

  try {
    let {data, loading, error} = await client.query({
      query: GET_USERS,
      variables: {email, password, roleId: role},
      fetchPolicy: 'no-cache'
    })

    return data.login
  }
  catch (e) {
    console.log(e)
  }
}

export const getAggregationMessagesCount = async (userId, roleId, aggregationData) => {
  let subQuery = ''
  Object.keys(aggregationData).forEach((key, idx) => {
    subQuery += `
      ${key} : getAggMessagesCnt(search: {
          userId: $userId
          roleId: $roleId
          categoryId: ${aggregationData[key].id}
      }) {
        success,
        msg,
        unreadMessagesCount,
        unreadUrgentMessagesCount
        unreadPriorityMessagesCount
    } \n
    `
  })
  const GET_AGGREGATION = gql`
    query getAggMessagesCnt($userId: BigInteger, $roleId: Int) @api(name: chatting) {
    ${subQuery}
  }
  `
  try {
    const { data, loading, error } = await client.query({
      query: GET_AGGREGATION,
      variables: {
        userId, roleId
      },
      fetchPolicy: "no-cache"
    })
    return data
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function getRoomsWithMsgCnt(reqData) {
  const GET_ROOMS = gql`
  query getRoomsWithMsgCnt($userId: BigInteger,
                        $roleId: Int,
                        $roleName: String,
                        $categoryId: Int,
                        $categoryName: String) @api(name: chatting) {
    getRoomsWithMsgCnt(search: {
        userId: $userId
        roleId: $roleId
        roleName: $roleName
        categoryId: $categoryId
        categoryName: $categoryName
    }) {
        success,
        msg,
        rooms {
            roomId,
            roomDescription,
            roomType,
            createdAt,
            updatedAt,
            deletedAt,
            userId,
            userName,
            userEmail,
            userAvatarUrl,
            draftMessagesCount,
            unreadMessagesCount,
            unreadUrgentMessagesCount,
            unreadPriorityMessagesCount,
            unreadFollowedMessagesCount,
            unreadMentionMessagesCount
        },
        totalCount,
        page,
        length,
        orderBy,
        orderDir
    }
  }
  `

  try {
    const { data, loading, error } = await client.query({
      query: GET_ROOMS,
      variables: {
        userId: reqData.userId,
        roleId: reqData.roleId,
        roleName: reqData.roleName,
        categoryId: reqData.categoryId,
        categoryName: reqData.categoryName,
      },
      fetchPolicy: 'no-cache'
    })

    return data.getRoomsWithMsgCnt
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function searchUsers(reqData) {
  const SEARCH_USERS = gql`
  query searchUsers($id: [BigInteger],
                    $name: String,
                    $email: String,
                    $userId: BigInteger,
                    $zulipId: BigInteger,
                    $apiKey: String,
                    $role: Int,
                    $avatarUrl: String,
                    $page: Int,
                    $length: Int,
                    $orderBy: String,
                    $orderDir: String) @api(name: chatting) {
    searchUsers(search: {
        id: $id
        name: $name
        email: $email
        userId: $userId
        zulipId: $zulipId
        apiKey: $apiKey
        role: $role
        avatarUrl: $avatarUrl
        page: $page
        length: $length
        orderBy: $orderBy
        orderDir: $orderDir
    }) {
        success,
        msg,
        totalCount,
        page,
        length,
        orderBy,
        orderDir,
        users {
            id,
            name,
            email,
            userId,
            roles {
                id,
                name
            },
            avatarUrl,
            createdAt,
            updatedAt,
            deletedAt
        }
    }
  }
  `

  try {
    const { data, loading, error } = await client.query({
      query: SEARCH_USERS,
      variables: {
        id: reqData.id,
        name: reqData.name,
        email: reqData.email,
        userId: reqData.userId,
        zulipId: reqData.zulipId,
        apiKey: reqData.apiKey,
        role: reqData.role,
        avatarUrl: reqData.avatarUrl,
        page: reqData.page,
        length: reqData.length,
        orderBy: reqData.orderBy,
        orderDir: reqData.orderDir,
      },
      fetchPolicy: 'no-cache'
    })

    return data.searchUsers
  }
  catch (e) {
    console.log(e)
  }

  return null
}


export async function getUserRelationList(userId, roleId, otherRoleId, page, length) {
  const GET_USER_RELATION_LIST = gql`
  query getUserRelsList($userId: BigInteger,
                    $userRoleId: Int,
                    $otherRoleId: Int,
                    $page: Int,
                    $length: Int,
                    $orderBy: String,
                    $orderDir: String) @api(name: chatting) {
      getUserRelsList(rel: {
          userId: $userId
          userRoleId: $userRoleId
          otherRoleId: $otherRoleId
          page: $page
          length: $length
          orderBy: $orderBy
          orderDir: $orderDir
      }) {
          users {
              id
              name
              email
              userId
              roles {
                  id
                  name
              }
              avatarUrl
              createdAt
              updatedAt
              deletedAt
          } 
          totalCount
          page
          length
          orderBy
          orderDir
      }
  }
  `

  try {
    const { data, loading, error } = await client.query({
      query: GET_USER_RELATION_LIST,
      variables: {
        userId: userId,
        userRoleId: roleId,
        otherRoleId: otherRoleId,
        page: page,
        length: length,
      },
      fetchPolicy: 'no-cache'
    })
    return data.getUserRelsList
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function getTopicsTree(reqData) {
  const GET_TOPIC_LIST = gql`
  query getTopicTree($id: BigInteger,
                    $roomId: BigInteger,
                    $categoryId: Int,
                    $userId: BigInteger!,
                    $roleId: Int!) @api(name: chatting) {
    getTopicTree(search: {   
        id: $id
        roomId: $roomId
        categoryId: $categoryId
        userId: $userId
        roleId: $roleId
    }) {
        success,
        msg,
        topics {
            id,
            name,
            description,
            roomId,
            parentId,
            createdBy,
            createdRoleId,
            path,
            draftMessagesCount,
            unreadMessagesCount,
            unreadUrgentMessagesCount,
            unreadPriorityMessagesCount,
            unreadFollowedMessagesCount,
            unreadMentionMessagesCount
        }
    }
  }
  `

  try {
    const { data, loading, error } = await client.query({
      query: GET_TOPIC_LIST,
      variables: {
        id: reqData.topicId,
        roomId: reqData.roomId,
        categoryId: reqData.categoryId,
        userId: reqData.userId,
        roleId: reqData.roleId,
      },
      fetchPolicy: 'no-cache'
    })
    return data.getTopicTree
  }
  catch (e) {
    console.log(e)
  }
  return null
}

export async function getMessages(reqData) {
  let GET_MESSAGES = gql`
  query getMessages(
      $id: BigInteger
      $boundId: BigInteger
      $userId: BigInteger,
      $userRoleId: Int,
      $topicId: BigInteger,
      $roomId: BigInteger,
      $categoryId: Int, 
      $isRead: Boolean, 
      $isFollowed: Boolean,
      $createdBy: BigInteger,
      $direction: Int,
      $count: Int ) @api(name: chatting) {
    getMessages(search: {
        id: $id
        boundId: $boundId
        userId: $userId
        userRoleId: $userRoleId
        topicId: $topicId
        roomId: $roomId
        categoryId: $categoryId
        isRead: $isRead
        isFollowed: $isFollowed
        createdBy: $createdBy
        direction: $direction
        count: $count
    }) {
        success,
        msg,
        messages {
            id,
            parentId,
            topicId,
            avatarUrl,
            userName,
            createdBy,
            content,
            path,
            category,
            audioFileUrl,
            audioFileName,
            audioFileType,
            audioFileSize,
            duration,
            readAt,
            followedAt,
            createdAt,
            updatedAt,
            deletedAt
        },
        totalCount,
        page,    
        length,
        orderBy,
        orderDir
    }
  }
  `
  try {
    let {data, loading, error} = await client.query({
      query: GET_MESSAGES,
      variables: {
        id: reqData.id,
        boundId: reqData.boundId,
        userId: reqData.userId,
        userRoleId: reqData.userRoleId,
        topicId: reqData.topicId,
        roomId: reqData.roomId,
        categoryId: reqData.categoryId,
        isRead: reqData.isRead,
        isFollowed: reqData.isFollowed,
        createdBy: reqData.createdBy,
        direction: reqData.direction,
        count: reqData.count
      },
      fetchPolicy: "no-cache"
    })

    return data.getMessages
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function readMessage(userId, messageId) {
  const READ_MESSAGE = gql`
  mutation readMessage($messageId: BigInteger,
                    $userId: BigInteger) @api(name: chatting) {
    readMessage(message: {
        userId: $userId
        messageId: $messageId
    }) {
        success
        msg
        userId
        messageId
        readAt
    }
  }
  `

  try {
    const { data, loading, error } = await client.mutate({
      mutation: READ_MESSAGE,
      variables: {
        messageId: messageId,
        userId: userId
      }
    })

    return data.readMessage
  }
  catch (e) {
    console.log(e)
  }

  return null

}

export async function sendMessage(reqData) {
  const SEND_MESSAGE = gql`
    mutation sendMessage($type: Int!,           
                    $content: String,
                    $parentId: BigInteger,
                    $topicId: BigInteger!, 
                    $categoryIds: [Int],
                    $createdBy: BigInteger!,
                    $roleId: Int!,
                    $audioFileUrl: String,
                    $audioFileType: String,
                    $audioFileName: String,
                    $audioFileSize: BigInteger,
                    $audioHertz: Int,
                    $duration: Int,
                    $model: String) @api(name: chatting) {
    sendMessage(dto: {
      type: $type
      content: $content
      parentId: $parentId  
      topicId: $topicId
      categoryIds: $categoryIds
      createdBy: $createdBy
      roleId: $roleId
      audioFileUrl: $audioFileUrl,
      audioFileType: $audioFileType,
      audioFileName: $audioFileName,
      audioFileSize: $audioFileSize,
      audioHertz: $audioHertz,
      duration: $duration,
      model: $model
    }) {
      success
      msg
      id
      topicId
      parentId
      content
      type
      categoryIds
      createdBy
      createdAt
      updatedAt
      deletedAt
    }
  }
  `

  try {
    const { data, loading, error } = await client.mutate({
      mutation: SEND_MESSAGE,
      variables: {
        type: reqData.type,
        content: reqData.content,
        parentId: reqData.parentId,
        topicId: reqData.topicId,
        categoryIds: reqData.categoryIds,
        createdBy: reqData.createdBy,
        roleId: reqData.roleId,
        audioFileUrl: reqData.audioFileUrl,
        audioFileName: reqData.audioFileName,
        audioFileType: reqData.audioFileType,
        audioFileSize: reqData.audioFileSize,
        duration: reqData.duration,
        audioHertz: reqData.audioHertz,
        model: reqData.model,
      }

    })

    return data.sendMessage
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function getAppointmentPatientRoomList(providerId, startDate, endDate) {
  const GET_APPOINTMENT_PATIENT_ROOM_LIST = gql`
  query getAppointmentPatientRoomList($providerId: BigInteger, 
  $startDate: Date, $endDate: Date) @api(name: chatting) {
    getAppointmentPatientRoomList(option:{
        providerId: $providerId,
        startDate: $startDate,
        endDate: $endDate
    }) {
          users {
            id
            name
            email
            avatarUrl
            roomId
            roomDescription
            createdAt
            updatedAt
            deletedAt
          }
          totalCount,
          page,
          length,
          orderBy,
          orderDir
      }
  }
  `

  try {
    const { data, loading, error } = await client.query({
      query: GET_APPOINTMENT_PATIENT_ROOM_LIST,
      variables: {
        providerId, startDate, endDate
      },
      fetchPolicy: 'no-cache'
    })
    return data.getAppointmentPatientRoomList
  }
  catch (e) {
    console.log(e)
  }
  return null
}

export async function followMessage(userId, messageId) {
  const FOLLOW_MESSAGE = gql`
    mutation followMessage($messageId: BigInteger,
                        $userId: BigInteger) @api(name: chatting) {
    followMessage(message: {
        userId: $userId
        messageId: $messageId
    }) {
        success
        msg
        userId
        messageId
        followedAt
    }
  }
  `

  try {
    let {data, loading, error} = await client.mutate({
      mutation: FOLLOW_MESSAGE,
      variables: {
        userId, messageId
      }
    })

    return data.followMessage
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function forwardToReceiver(reqData) {
  const FORWARD_TO_RECEIVER = gql`
    mutation forwardToReceiver(
                    $id: BigInteger
                    $parentId: BigInteger,
                    $topicId: BigInteger!, 
                    $createdBy: BigInteger!,
                    $roleId: Int!) @api(name: chatting) {
    forwardMessageToReceiver(dto: {
      id: $id
      parentId: $parentId  
      topicId: $topicId
      createdBy: $createdBy
      roleId: $roleId
    }) {
      success
      msg
      id
      topicId
      parentId
      content
      type
      categoryIds
      createdBy
      createdAt
      updatedAt
      deletedAt
    }
  }
  `

  try {
    const { data, loading, error } = await client.mutate({
      mutation: FORWARD_TO_RECEIVER,
      variables: {
        id: reqData.id, parentId: reqData.parentId,
        topicId: reqData.topicId, roleId: reqData.roleId,
        createdBy: reqData.createdBy
      }
    })
    return data.forwardMessageToReceiver
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function forwardToAssistant2(reqData) {
  const FORWARD_TO_ASSISTANT2 = gql`
    mutation forwardMessageToAssitantTwo(
                      $id: BigInteger
                      $parentId: BigInteger,
                      $topicId: BigInteger!, 
                      $createdBy: BigInteger!,
                      $roleId: Int!) @api(name: chatting) {
    forwardMessageToAssitantTwo(dto: {
      id: $id
      parentId: $parentId  
      topicId: $topicId
      createdBy: $createdBy
      roleId: $roleId
    }) {
      success
      msg
      id
      topicId
      parentId
      content
      type
      categoryIds
      createdBy
      createdAt
      updatedAt
      deletedAt
    }
  }
  `

  try {
    const { data, loading, error } = await client.mutate({
      mutation: FORWARD_TO_ASSISTANT2,
      variables: {
        id: reqData.id, parentId: reqData.parentId,
        topicId: reqData.topicId, roleId: reqData.roleId,
        createdBy: reqData.createdBy
      }
    })
    return data.forwardMessageToAssitantTwo
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function forwardToOther(reqData) {
  const FORWARD_TO_OTHER = gql`
    mutation forwardMessageToOther(
                    $id: BigInteger
                    $parentId: BigInteger,
                    $topicId: BigInteger!, 
                    $createdBy: BigInteger!,
                    $roleId: Int!,
                    $others: [BigInteger]) @api(name: chatting) {
    forwardMessageToOther(dto: {
      id: $id
      parentId: $parentId  
      topicId: $topicId
      createdBy: $createdBy
      roleId: $roleId
      others: $others
    }) {
      success
      msg
      id
      topicId
      parentId
      content
      type
      categoryIds
      createdBy
      createdAt
      updatedAt
      deletedAt
    }
  }
  `

  try {
    const { data, loading, error } = await client.mutate({
      mutation: FORWARD_TO_OTHER,
      variables: {
        id: reqData.id, parentId: reqData.parentId,
        topicId: reqData.topicId, roleId: reqData.roleId,
        createdBy: reqData.createdBy, others: reqData.others
      }
    })
    return data.forwardMessageToOther
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function getFirstUnreadMessages(reqData) {
  const GET_FIRST_UNREAD_MESSAGE = gql`
  query getMessages(
      $userId: BigInteger,
      $userRoleId: Int,
      $topicId: BigInteger,
      $roomId: BigInteger,
      $categoryId: Int, 
      $isFollowed: Boolean,
      $createdBy: BigInteger,
      $count: Int ) @api(name: chatting) {
      getFirstUnreadMessages(search: {
          userId: $userId
          userRoleId: $userRoleId
          topicId: $topicId
          roomId: $roomId
          categoryId: $categoryId
          isFollowed: $isFollowed
          createdBy: $createdBy
          count: $count
      }) {
          success,
          msg,
          messages {
              id,
              parentId,
              topicId,
              avatarUrl,
              userName,
              createdBy,
              content,
              path,
              category,
              audioFileUrl,
              audioFileName,
              audioFileType,
              audioFileSize,
              duration,
              readAt,
              followedAt,
              createdAt,
              updatedAt,
              deletedAt
          },
          totalCount,
          page,    
          length,
          orderBy,
          orderDir
      }
  }
  `

  try {
    const { data, loading, error } = await client.query({
      query: GET_FIRST_UNREAD_MESSAGE,
      variables: {
        userId: reqData.userId,
        userRoleId: reqData.userRoleId,
        topicId: reqData.topicId,
        roomId: reqData.roomId,
        categoryId: reqData.categoryId,
        isFollowed: reqData.isFollowed,
        createdBy: reqData.createdBy,
        count: reqData.count
      },
      fetchPolicy: 'no-cache'
    })
    return data.getFirstUnreadMessages
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function getLastUnreadMessages(reqData) {
  const GET_LAST_UNREAD_MESSAGES = gql`
  query getMessages(
    $userId: BigInteger,
    $userRoleId: Int,
    $topicId: BigInteger,
    $roomId: BigInteger,
    $categoryId: Int, 
    $isFollowed: Boolean,
    $createdBy: BigInteger,
    $count: Int ) @api(name: chatting) {
    
    getLastUnreadMessages(search: {
          userId: $userId
          userRoleId: $userRoleId
          topicId: $topicId
          roomId: $roomId
          categoryId: $categoryId
          isFollowed: $isFollowed
          createdBy: $createdBy
          count: $count
      }) {
          success,
          msg,
          messages {
              id,
              parentId,
              topicId,
              avatarUrl,
              userName,
              createdBy,
              content,
              path,
              category,
              audioFileUrl,
              audioFileName,
              audioFileType,
              audioFileSize,
              duration,
              readAt,
              followedAt,
              createdAt,
              updatedAt,
              deletedAt
          },
          totalCount,
          page,    
          length,
          orderBy,
          orderDir
      }
  }
  `

  try {
    const { data, loading, error } = await client.query({
      query: GET_LAST_UNREAD_MESSAGES,
      variables: {
        userId: reqData.userId,
        userRoleId: reqData.userRoleId,
        topicId: reqData.topicId,
        roomId: reqData.roomId,
        categoryId: reqData.categoryId,
        isFollowed: reqData.isFollowed,
        createdBy: reqData.createdBy,
        count: reqData.count
      },
      fetchPolicy: 'no-cache'
    })

    return data.getLastUnreadMessages
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function getSubscribersOfRoom(userId, roleId, roomId) {
  const GET_SUBSCRIBERS_ROOM = gql`
  query getSubscribersOfRoom($userId: BigInteger,
                $roleId: Int,
                $roomId: BigInteger) @api(name: chatting) {
    getSubscribersOfRoom(dto: {
        userId: $userId
        roleId: $roleId
        roomId: $roomId
    }) {
        success,
        msg,
        users {
            id,
            name,
            email,
            avatarUrl,
            createdAt,
            updatedAt,
            deletedAt
        }
    }
  }
  `

  try {
    const { data, loading, error } = await client.query({
      query: GET_SUBSCRIBERS_ROOM,
      variables: {
        userId, roleId, roomId
      },
      fetchPolicy: 'no-cache'
    })
    return data.getSubscribersOfRoom
  }
  catch (e) {
    console.log(e)
  }

  return null
}

// ===============================================================

export async function getRooms(userId, id, name, roleId) {
  let GET_ROOMS = gql`
  query getRooms($userId: BigInteger,
                $id: BigInteger,
                $name: String,
                $roleId: BigInteger) @api(name: chatting) {
      getRooms(roomData: {
        user_id: $userId
        id: $id
        name: $name
        role_id: $roleId
      }) {
        name,
        created_by,
        role_id,
        created_at,
        updated_at,
        deleted_at
      }
    }
  `

  try {
    let {data, loading, error} = await client.query({
      query: GET_ROOMS,
      variables: {userId, id, name, roleId}
    })
    return data.getRooms
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function editMessage(userId, messageId, content) {
  let EDIT_MESSAGE = gql`
  mutation editMessage($userId: BigInteger, $messageId: BigInteger, $content: String) @api(name: chatting) {
    editMessage(messageData: {
      user_id: $userId
      message_id: $messageId
      content: $content
    }) {
      id
    }
  }
  `

  try {
    let {data, loading, error} = await client.mutate({
      mutation: EDIT_MESSAGE,
      variables: {userId, messageId, content}
    })
    return data.editMessage
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function CreateChatUser(param) {
  const CREATE_CHAT_USER = gql`
    mutation createUser($password: String,
                      $role: BigInteger,
                      $fullName: String,
                      $userId: BigInteger,
                      $email: String) @api(name: chatting) {
    createUser(userdata: {
      password: $password
      role: $role
      full_name: $fullName
      user_id: $userId
      email: $email
    }) {
      id,
      email,
      name,
      password,
      role_id,
      user_id,
      zulip_user_id,
      api_key,
      created_at,
      updated_at,
      deleted_at
    }
  } `

  const { fullName, userId, email, role, password } = { ...param }
  const { loading, error, data } = await client.mutate({
    mutation: CREATE_CHAT_USER,
    variables: { fullName: fullName, userId: userId, email: email, role: role, password: password },
  })

  return data.createUser
}

export async function getChatUser(email, password) {
  let GET_USER = gql`
        query getChatUser($email: String, $password: String) @api(name: chatting) {
            getUser(email: $email, password: $password) {
                api_key          
                email
                id
                name
                password
                role_id
                user_id
                zulip_user_id
            }
        }
    `

  let { loading, error, data } = await client.query({
    query: GET_USER,
    variables: { email, password }
  })

  return data.getUser
}

export async function moveMessage(streamId, userId, messageId, topicId) {
  let MOVE_MESSAGE = gql`
  mutation MoveMessage($streamId: BigInteger, $userId: BigInteger, 
    $messageId: BigInteger, $topicId: BigInteger) @api(name: chatting) {
      moveMessage(messageData: {
        stream_id: $streamId
        user_id: $userId
        message_id: $messageId
        topic_id: $topicId
      }) {
        id
      }
    }
  `

  let { data, loading, error } = await client.mutate({
    mutation: MOVE_MESSAGE,
    variables: { streamId, userId, messageId, topicId }
  })
  return data.moveMessage
}

export async function copyMessage(streamId, userId, messageId, topicId) {
  let COPY_MESSAGE = gql`
  mutation CopyMessage($streamId: BigInteger, $userId: BigInteger, $messageId: BigInteger,
    $topicId: BigInteger) @api(name: chatting) {
      copyMessage(messageData: {
        stream_id: $streamId
        user_id: $userId
        message_id: $messageId
        topic_id: $topicId
      }) {
        id
      }
    }
  `

  let { data, loading, error } = await client.mutate({
    mutation: COPY_MESSAGE,
    variables: { streamId, userId, messageId, topicId }
  })
  return data.copyMessage
}

export async function forwardMessage(streamId, userId, messageId, topicId) {
  let FORWARD_MESSAGE = gql`
  mutation ForwardMessage($streamId: BigInteger, $userId: BigInteger, 
    $messageId: BigInteger, $topicId: BigInteger) @api(name: chatting) {
      forwardMessage(messageData: {
        stream_id: $streamId
        user_id: $userId
        message_id: $messageId
        topic_id: $topicId
      }) {
        id
      }
    }
  `

  let { data, loading, error } = await client.mutate({
    mutation: FORWARD_MESSAGE,
    variables: { streamId, userId, messageId, topicId }
  })
  return data.forwardMessage
}

export async function createTopic(streamId, userId, parentId, name) {
  let CREATE_TOPIC = gql`
  mutation CreateTopic($streamId: BigInteger, $userId: BigInteger,
    $parentId: BigInteger, $name: String) @api(name: chatting) {
      createTopic(topicData: {
        stream_id: $streamId
        user_id: $userId
        parent_id: $parentId
        name: $name
      }) {
        stream_id
        parent_id
        name
        id
        topic_id
      }
    }
  `

  let { data, loading, error } = await client.mutate({
    mutation: CREATE_TOPIC,
    variables: { streamId, userId, parentId, name }
  })
  return data.createTopic
}

export async function createSubTopic(streamId, userId, parentId, name) {
  let CREATE_SUB_TOPIC = gql`
  mutation CreateSubTopic($streamId: BigInteger, $userId: BigInteger, 
    $parentId: BigInteger, $name: String) @api(name: chatting) {
      createSubTopic(topicData: {
        stream_id: $streamId
        user_id: $userId
        parent_id: $parentId
        name: $name
      }) {
        stream_id
        parent_id
        name
        id
        topic_id
      }
    }
  `

  let { data, loading, error } = await client.mutate({
    mutation: CREATE_SUB_TOPIC,
    variables: { streamId, userId, parentId, name }
  })
  return data.createSubTopic
}