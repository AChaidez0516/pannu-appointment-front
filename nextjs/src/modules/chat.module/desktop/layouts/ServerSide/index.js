import dynamic from 'next/dynamic'

import ChatHeader from '../ChatHeader'
import chat_styled from '../../../../../common/constant/chat.module.css'
import useWindowDimensions from '../../../../../common/hooks/useWindowDimensions'

const Aggregation = dynamic(() => import('../Aggregation'), { ssr: false })
const Rooms = dynamic(() => import('../Rooms'), { ssr: false })

import { useEffect } from 'react'
import { format, parse, addDays, subDays } from 'date-fns'
import { useChatMetadata, useMessageEvent, useChatMessage,
  useRoomList, useProviderList, usePatientList, useOtherUserList,
  useTopicList } from '../../../../../redux/hooks/useChatStore'
import { useChatUser, useLoadingStatus } from '../../../../../redux/hooks/useCommonStore'
import {
  getAppointmentPatientRoomList, getRoomsWithMsgCnt,
} from '../../../../../common/lib/chat'
import { getTopicList } from '../../../shared/handleTopicList'
import {
  ServerSideWrapper,
  Divider,
  Container,
  Overlay,
} from './styled'

import {
  ChatUserRole,
  MenuCategory,
  RoomType,
  assistant,
  appointment,
  nonPatients,
  HealthcarePartners,
  MessageEventType, rooms, ChatMode,
} from '../../../shared/constants'

function ServerSide() {
  const { chatUser } = useChatUser()
  const { metaUser,
    commitChatMetadata, commitMetaCategory, commitMetaUser,
    commitMetaRoom, commitMetaOtherUser, commitMetaTopic } = useChatMetadata()

  const { roomList, commitRoomList } = useRoomList()
  const { commitTopicList } = useTopicList()
  const { commitOtherUserList } = useOtherUserList()
  const { commitMessageList } = useChatMessage()
  const { providerList, commitProviderList } = useProviderList()
  const { patientList, commitPatientList } = usePatientList()
  const { messageEvent } = useMessageEvent()
  const { commitLoadingStatus } = useLoadingStatus()

  const { height, width } = useWindowDimensions()
  const calcHeight = height - (chatUser.role_id == ChatUserRole.PATIENT ? 70 : 0)

  const initStoreData = () => {
    commitChatMetadata({
      topic: null,
      ref: '',
      chat_mode: ChatMode.PUBLIC,
      category: MenuCategory.NONE,
      user: null,
      other_user: null,
      room: null
    })
    commitProviderList([])
    commitPatientList([])
    commitTopicList([])
    commitMessageList([])
    commitOtherUserList([])
    commitRoomList([])
  }

  const getData = () => {

    if (!chatUser) {
      commitLoadingStatus(false)
      return
    }

    if (chatUser.role_id == ChatUserRole.STAFF || chatUser.role_id == ChatUserRole.ASSISTANT
      || chatUser.role_id == ChatUserRole.PROVIDER ) {
      /*getRooms().then(res => {
        if (!res)
          return

        commitRoomList([...res])
      })*/

      let list = []
      rooms.forEach((v, idx) => {
        if (chatUser.role_id != ChatUserRole.ASSISTANT) {
          list.push({id: idx, name: v})
        }
        else {
          if (v.toLowerCase() == 'system')
            list.push({id: idx, name: v})
        }
      } )
      commitRoomList(list)
    }

    switch (chatUser.role_id) {
      case ChatUserRole.ADMIN:
        break;
      case ChatUserRole.STAFF:
      case ChatUserRole.ASSISTANT:
      case ChatUserRole.PATIENT:
      case ChatUserRole.SCRIBE:
        getRoomsWithMsgCnt({ userId: chatUser.id, roleId: chatUser.role_id }).then(res => {
          if (!res || !res.success)
            return

          let list = []
          res.rooms.forEach(v => {
            if (v.roomType == RoomType.PROVIDER_TO_PATIENT) {
              list.push({
                id: v.userId,
                name: v.userName + `(${v.roomType})`,
                roleId: ChatUserRole.PROVIDER,
                email: v.userEmail,
                //userId: '',
                avatarUrl: v.userAvatarUrl,
                roomId: v.roomId,
                roomDescription: v.roomDescription,
                roomType: v.roomType,
                draftMessagesCount: v.draftMessagesCount,
                unreadMessagesCount: v.unreadMessagesCount,
                unreadUrgentMessagesCount: v.unreadUrgentMessagesCount,
                unreadPriorityMessagesCount: v.unreadPriorityMessagesCount,
                unreadFollowedMessagesCount: v.unreadFollowedMessagesCount,
                unreadMentionMessagesCount: v.unreadMentionMessagesCount,
              })
            }
          })

          commitProviderList([...list])
        })

        break;
      case ChatUserRole.PROVIDER:
        getRoomsWithMsgCnt({ userId: chatUser.id, roleId: chatUser.role_id }).then(res => {
          if (!res || !res.success)
            return

          let list = []
          res.rooms.forEach(v => {
            if (v.roomType == RoomType.PROVIDER_TO_PATIENT) {
              list.push({
                id: v.userId,
                name: v.userName,
                roleId: ChatUserRole.PATIENT,
                email: v.userEmail,
                //userId: '',
                avatarUrl: v.userAvatarUrl,
                roomId: v.roomId,
                roomDescription: v.roomDescription,
                roomType: v.roomType,
                draftMessagesCount: v.draftMessagesCount,
                unreadMessagesCount: v.unreadMessagesCount,
                unreadUrgentMessagesCount: v.unreadUrgentMessagesCount,
                unreadPriorityMessagesCount: v.unreadPriorityMessagesCount,
                unreadFollowedMessagesCount: v.unreadFollowedMessagesCount,
                unreadMentionMessagesCount: v.unreadMentionMessagesCount,
              })
            }
          })

          commitPatientList([...list])
        })
        break;
    }

    commitLoadingStatus(false)
  }

  useEffect(() => {
    initStoreData()
    getData()

  },[])

  const clickRoom = (roomId) => {
    initContentRelatedToCategory()
    commitMetaCategory(MenuCategory.ROOM)
  }

  const clickAppointment = (appointment) => {
    const today = new Date()
    let startDate = format(today, 'yyyy-MM-dd')
    let endDate =  format(today, 'yyyy-MM-dd')
    if (appointment.id == 1) {

    }
    else if (appointment.id == 2) {
      // only working days
      const todayIndex = today.getDay()
      let offsetNextDays = 3, offsetPrevDays = 3

      if (todayIndex == 3 || todayIndex == 4 || todayIndex == 5)
        offsetNextDays += 2
      if (todayIndex == 6)
        offsetNextDays += 1

      if (todayIndex == 3 || todayIndex == 2 || todayIndex == 1)
        offsetPrevDays += 2
      if (todayIndex == 0)
        offsetPrevDays += 1

      startDate = format(subDays(today, offsetPrevDays), 'yyyy-MM-dd')
      endDate = format(addDays(today, offsetNextDays), 'yyyy-MM-dd')

    }
    else if (appointment.id == 3) {
      startDate = format(subDays(today, 7), 'yyyy-MM-dd')
      endDate = format(addDays(today, 7), 'yyyy-MM-dd')
    }

    //startDate = '2021-04-21'
    //endDate = '2023-04-23'

    getAppointmentPatientRoomList(chatUser.id, startDate, endDate).then(res => {
      if (!res)
        return

      let list = []

      res.users.forEach(v => list.push({
        id: v.id,
        name: v.name,
        roleId: ChatUserRole.PATIENT,
        email: v.email,
        userId: v.userId,
        avatarUrl: v.avatarUrl,
        roomId: v.roomId,
        roomDescription: v.roomDescription
      }))

      commitOtherUserList(list)
    })

    initContentRelatedToCategory()
    commitMetaCategory(MenuCategory.APPOINTMENT)
  }

  const clickAllPatient = (user) => {
    if (chatUser.role_id == ChatUserRole.PROVIDER) {
      getTopicList({ roomId: user.roomId, userId: chatUser.id, roleId: chatUser.role_id }).then(res => {
        if (!res)
          return

        commitTopicList(res)
      })

      initContentRelatedToCategory()
      commitMetaUser(user)
      commitMetaRoom({
        id: user.roomId,
        name: '',
        description: user.roomDescription,
        type: user.roomType,
        createdBy: '',
      })
      commitMetaCategory(MenuCategory.PROVIDER_TO_PATIENT)
    }
    else if (chatUser.role_id == ChatUserRole.STAFF) {
      getTopicList({ roomId: user.roomId, userId: chatUser.id, roleId: chatUser.role_id }).then(res => {
        if (!res)
          return

        commitTopicList(res)
      })

      commitMetaRoom({
        id: user.roomId,
        name: '',
        description: user.roomDescription,
        type: '',
        createdBy: '',
      })

      commitMetaTopic(null)
      commitMessageList([])
      commitMetaOtherUser(user)
      commitMetaCategory(MenuCategory.STAFF_TO_PATIENT)
    }
  }

  const clickProviderForAssistant = (provider) => {
    getRoomsWithMsgCnt({ userId: provider.id, roleId: provider.roleId }).then(res => {
      if (!res || !res.success)
        return

      let list = []
      res.rooms.forEach(v => {
        if (v.roomType == RoomType.PROVIDER_TO_PATIENT) {
          list.push({
            id: v.userId,
            name: v.userName,
            roleId: ChatUserRole.PATIENT,
            email: v.userEmail,
            //userId: '',
            avatarUrl: v.userAvatarUrl,
            roomId: v.roomId,
            roomDescription: v.roomDescription,
            roomType: v.roomType,
            draftMessagesCount: v.draftMessagesCount,
            unreadMessagesCount: v.unreadMessagesCount,
            unreadUrgentMessagesCount: v.unreadUrgentMessagesCount,
            unreadPriorityMessagesCount: v.unreadPriorityMessagesCount,
            unreadFollowedMessagesCount: v.unreadFollowedMessagesCount,
            unreadMentionMessagesCount: v.unreadMentionMessagesCount,
          })
        }
      })

      commitPatientList([...list])
    })

    initContentRelatedToCategory()
    commitMetaUser(provider)
    commitMetaCategory(MenuCategory.PROVIDER_FOR_ASSISTANT)
  }

  const clickPatientForAssistant = (patient) => {
    getTopicList({ roomId: patient.roomId, userId: chatUser.id, roleId: chatUser.role_id }).then(res => {
      if (!res)
        return

      commitTopicList(res)
    })

    commitTopicList([])
    commitMessageList([])
    commitOtherUserList([])
    commitMetaOtherUser(patient)
    commitMetaRoom({
      id: patient.roomId,
      name: '',
      description: patient.roomDescription,
      type: patient.roomType,
      createdBy: '',
    })

    commitMetaCategory(MenuCategory.PATIENT_FOR_ASSISTANT)
  }

  const clickNonPatient =  (nonePatient) => {
    initContentRelatedToCategory()
    commitMetaUser({ id: nonePatient.id })
    commitMetaCategory(MenuCategory.NONE_PATIENT)
  }

  const clickAllProviders = (user) => {
    if (chatUser.role_id == ChatUserRole.PATIENT) {
      getTopicList({ roomId: user.roomId, userId: chatUser.id, roleId: chatUser.role_id }).then(res => {
        if (!res)
          return

        commitTopicList(res)
      })

      initContentRelatedToCategory()
      commitMetaUser(user)
      commitMetaRoom({
        id: user.roomId,
        name: '',
        description: user.roomDescription,
        type: user.roomType,
        createdBy: '',
      })
      commitMetaCategory(MenuCategory.PATIENT_TO_PROVIDER)
    }
    else if (chatUser.role_id == ChatUserRole.SCRIBE) {
      getTopicList({ roomId: user.roomId, userId: chatUser.id, roleId: chatUser.role_id }).then(res => {
        if (!res || !res.length == 0)
          return

        let data = {
          id: res[0].id,
          name: res[0].name
        }
        commitMetaTopic(data)
      })

      initContentRelatedToCategory()
      commitMetaRoom({
        id: user.roomId,
        name: '',
        description: user.roomDescription,
        type: user.roomType,
        createdBy: '',
      })
      commitMetaUser(user)
      commitMetaCategory(MenuCategory.SCRIBE_TO_PROVIDER)
    }
    else if (chatUser.role_id == ChatUserRole.STAFF) {

      getRoomsWithMsgCnt({ userId: user.id, roleId: user.roleId }).then(res => {
        if (!res || !res.success)
          return

        let list = []
        res.rooms.forEach(v => {
          if (v.roomType == RoomType.PROVIDER_TO_PATIENT) {
            list.push({
              id: v.userId,
              name: v.userName,
              roleId: ChatUserRole.PATIENT,
              email: v.userEmail,
              //userId: '',
              avatarUrl: v.userAvatarUrl,
              roomId: v.roomId,
              roomDescription: v.roomDescription,
              roomType: v.roomType,
              draftMessagesCount: v.draftMessagesCount,
              unreadMessagesCount: v.unreadMessagesCount,
              unreadUrgentMessagesCount: v.unreadUrgentMessagesCount,
              unreadPriorityMessagesCount: v.unreadPriorityMessagesCount,
              unreadFollowedMessagesCount: v.unreadFollowedMessagesCount,
              unreadMentionMessagesCount: v.unreadMentionMessagesCount,
            })
          }
        })

        commitPatientList([...list])
      })

      initContentRelatedToCategory()
      commitMetaUser(user)
      commitMetaCategory(MenuCategory.STAFF_TO_PROVIDER)
    }
  }

  const clickOtherSubjects = (nonPatient) => {

  }

  const clickShowAllMessage = (data) => {
    initContentRelatedToCategory()
    commitMetaRoom({
      id: data.roomId,
      name: '',
      description: data.roomDescription,
      type: data.roomType,
      createdBy: '',
    })
    commitMetaUser(data)
    commitMetaCategory(MenuCategory.SHOW_MESSAGE_OF_ROOM)
  }

  const initContentRelatedToCategory = () => {
    commitMessageList([])
    commitTopicList([])
    commitOtherUserList([])
    commitMetaUser(null)
    commitMetaOtherUser(null)
    commitMetaRoom(null)
    commitMetaCategory(MenuCategory.NONE)
    commitMetaTopic(null)
  }

  return (
    <>
      <ServerSideWrapper style={{ height: calcHeight }} isReduceHeight={chatUser.role_id == ChatUserRole.PATIENT }>
        <ChatHeader />
        <Container className={(messageEvent.type == MessageEventType.COPY
          || messageEvent.type == MessageEventType.FORWARD ) ? 'disable-overflow' : chat_styled.scrollbar}>
          { (messageEvent.type == MessageEventType.COPY
            || messageEvent.type == MessageEventType.FORWARD )&& <Overlay /> }

          { (chatUser && chatUser.role_id == ChatUserRole.SCRIBE)&& (
            <>
              <Rooms title="Providers"
                     rooms={providerList}
                     hasAggregate={true}
                     handleClick={clickAllProviders}
                     handleSortText={ () => {} }
                     handleSortTime={ () => {} }
                    />
              <Divider/>
            </>
          ) }

          { (chatUser.role_id == ChatUserRole.PROVIDER
            || chatUser.role_id == ChatUserRole.PATIENT
            || chatUser.role_id == ChatUserRole.SCRIBE)&& <Aggregation kind={0} title="Aggregate rooms" /> }

          { (chatUser && (chatUser.role_id == ChatUserRole.ASSISTANT))&& (
            <>
              <Rooms
                title="Doctors"
                rooms={providerList}
                marginTop={-16}
                hasAggregate={true}
                handleClick={clickProviderForAssistant} />
              <Aggregation kind={0} title="Main" />
              <Rooms
                title="Rooms"
                rooms={roomList}
                hasAggregate={false}
                handleClick={clickRoom} />
              { metaUser&&
                <Rooms
                  title="All Patients"
                  rooms={patientList}
                  hasAggregate={true}
                  handleClick={clickPatientForAssistant}
                  handleSearch={ () => {} }
                  handleSortText={ () => {} }
                  handleSortTime={ () => {} } /> }
              <Rooms
                title="Non patient"
                rooms={nonPatients}
                hasAggregate={true}
                handleClick={clickNonPatient}
                handleSearch={ () => {} }
                handleSortText={ () => {} }
                handleSortTime={ () => {} }
                handleAdd={ () => {} }
              />
            </>
          ) }

          { (chatUser && chatUser.role_id == ChatUserRole.PROVIDER)&& (
            <>
              <Rooms
                title="None aggregate rooms"
                rooms={roomList}
                hasAggregate={false}
                handleClick={clickRoom}
                handleSearch={ () => {} }
                handleSortText={ () => {} }
                handleSortTime={ () => {} }
              />
              {/*<Rooms title="Assistant" handleClick={clickAssistant} rooms={assistant} />*/}
              <Rooms
                title="Appointments"
                rooms={appointment}
                hasAggregate={false}
                handleClick={clickAppointment}  />
              <Rooms
                title="All Patients"
                rooms={patientList}
                hasAggregate={false}
                handleClick={clickAllPatient}
                handleSearch={ () => {} }
                handleSortText={ () => {} }
                handleSortTime={ () => {} }
                handleAdd={ () => {} }
                handleShowAllMessage={clickShowAllMessage}
              />
              <Rooms
                title="Non Patients"
                rooms={nonPatients}
                hasAggregate={true}
                handleClick={clickNonPatient}
                handleSearch={ () => {} }
                handleSortText={ () => {} }
                handleSortTime={ () => {} }
                handleAdd={ () => {} } />
            </>
          ) }

          { (chatUser && chatUser.role_id == ChatUserRole.STAFF)&& (
            <>
              <Rooms
                title="Doctors"
                rooms={providerList}
                hasAggregate={true}
                handleClick={clickAllProviders} />
              <Aggregation kind={0} title="Aggregate rooms" />
              <Rooms
                title="None aggregate rooms"
                rooms={roomList}
                hasAggregate={false}
                handleClick={clickRoom} />
              <Rooms
                title="Appointments"
                rooms={appointment}
                hasAggregate={false}
                handleClick={clickAppointment} />
              { metaUser&&
                <Rooms
                  title="All Patient"
                  rooms={patientList}
                  hasAggregate={false}
                  handleClick={clickAllPatient}
                  handleShowAllMessage={ () => {} }
                  />
              }
              <Rooms
                title="Non patient"
                rooms={nonPatients}
                hasAggregate={true}
                handleClick={clickNonPatient}
                handleSearch={ () => {} }
                handleSortText={ () => {} }
                handleSortTime={ () => {} }
                handleAdd={ () => {} } />
            </>
          ) }

          { (chatUser && chatUser.role_id == ChatUserRole.PATIENT)&& (
            <>
              <Rooms
                title="Healthcare partners"
                rooms={HealthcarePartners}
                hasAggregate={false}
                handleClick={clickOtherSubjects}
                handleAdd={ () => {} } />
              <Rooms
                title="All Doctors"
                rooms={providerList}
                hasAggregate={false}
                handleClick={clickAllProviders}
                handleSearch={ () => {} }
                handleSortText={ () => {} }
                handleSortTime={ () => {} }
                handleShowAllMessage={ () => {} } />
              <Rooms
                title="Other subjects"
                rooms={nonPatients}
                hasAggregate={true}
                handleClick={clickOtherSubjects}
                handleSearch={ () => {} }
                handleSortText={ () => {} }
                handleSortTime={ () => {} }
                handleAdd={ () => {} }
              />
            </>
          ) }

        </Container>
      </ServerSideWrapper>
    </>
  )
}

export default ServerSide
