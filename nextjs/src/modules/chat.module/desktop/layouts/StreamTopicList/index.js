import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import StreamTopicItem from '../StreamTopicItem'
import CreateStream from '../../modals/CreateStream'

import { useEffect, useState, useCallback } from 'react'

import { useChatMetadata, useTopicList, useMessageEvent,
  useChatMessage, useOtherUserList, useUISetting } from '../../../../../redux/hooks/useChatStore'
import { useChatUser, useLoadingStatus } from '../../../../../redux/hooks/useCommonStore'
import {
  ChatUserRole, ResultStatus, MessageEventType,
  createStreamFields, MenuCategory, PerPageCount
} from '../../../shared/constants'
import { PlusIcon } from '../../../../../common/utils/Icons'

import { getTopicList } from '../../../shared/handleTopicList'
import { getTreeIndexesFromId, getSpreadListFromTreeIndexes } from '../../../shared/handleTreeList'

import {
  StyledTreeItem,
  OtherUserWrapper,
  Divider,
  DividerPlusWrapper,
  StremTopicWrapper,
} from './styled'

function StreamTopicList() {
  const { chatUser } = useChatUser()
  const { messageEvent } = useMessageEvent()
  const { metaCategory, metaUser, metaOtherUser, metaRoom,
    commitMetaTopic, commitMetaRoom, commitMetaUser, commitMetaOtherUser } = useChatMetadata()
  const { topicList, searchedTopicList, commitTopicList, addSelectedTopicData, deleteUnSelectedTopicData } = useTopicList()
  const { otherUserList } = useOtherUserList()
  const { commitMessageList } = useChatMessage()
  const { commitLoadingStatus } = useLoadingStatus()
  const { collapsedFlags } = useUISetting()

  const [isNewStream, setIsNewStream] = useState(false)
  const [newStream, setNewStream] = useState("")
  const [description, setDescription] = useState("")
  
  const callback = useCallback((newStream, description) => {
    setNewStream(newStream)
    setDescription(description)
  }, [])

  useEffect(() => {
    if (!chatUser.id) {
      return
    }

    if (metaCategory == MenuCategory.APPOINTMENT) {
      // TODO: implement later
    }
    else if (metaCategory == MenuCategory.NONE_PATIENT) {
      // TODO: implement later
    }
    else if (metaCategory == MenuCategory.STAFF_TO_PATIENT) {
      // TODO: implement later
    }
    else if (metaCategory == MenuCategory.SCRIBE_TO_PROVIDER) {
      // TODO: implement later
    }
  }, [metaCategory, metaUser])

  const checkedTopic = (topicId, checked) => {
    if (messageEvent.type != MessageEventType.COPY && messageEvent.type != MessageEventType.FORWARD)
      return

    const indexes = getTreeIndexesFromId(topicList, 'id', topicId)
    const list = getSpreadListFromTreeIndexes(topicList, indexes, 0)
    if (list == null || list.length == 0)
      return

    const topic = list[list.length - 1]
    if (checked)
      addSelectedTopicData(topic)
    else
      deleteUnSelectedTopicData(topic.id)
  }

  const clickTopic = async (item) => {
    if (messageEvent.type == MessageEventType.FORWARD || messageEvent.type == MessageEventType.COPY)
      return

    if (chatUser.role_id == ChatUserRole.ASSISTANT) {
      // TODO: check if assistant subscribed for this topic
      if (false) {
        // TODO: subscribe process
      }
    }

    let data = {
      id: item.id,
      name: item.name
    }

    commitMessageList([])
    commitMetaTopic(data)
  }

  const clickAppointment = (patient) => {
    getTopicList({ roomId: patient.roomId, userId: chatUser.id, roleId: chatUser.role_id }).then(res => {
      if (!res)
        return

      commitTopicList(res)
    })

    commitMessageList([])
    commitTopicList([])
    commitMetaOtherUser(patient)
    commitMetaRoom({
      id: patient.roomId,
      name: '',
      description: patient.roomDescription,
      type: patient.roomType,
      createdBy: '',
    })
  }

  const clickAggregate = (user) => {
    getTopicList({ roomId: user.roomId, userId: chatUser.id, roleId: chatUser.role_id }).then(res => {
      if (!res)
        return

      commitTopicList(res)
    })

    commitMessageList([])
    commitTopicList([])
    commitMetaOtherUser(user)
    commitMetaRoom({
      id: user.roomId,
      name: '',
      description: user.roomDescription,
      type: user.roomType,
      createdBy: '',
    })
  }

  const clickScribe = async (scribe) => {

  }

  const clickAssistant = (assistant) => {

  }

  const getCategoryText = (category) => {
    const labels = ['', 'Room', 'Appointment', 'Scribe', 'Assistant', 'Provider To Patient', 'Patient', 'Patient To Provider']
    return labels[category]
  }

  const hasDividerLine = () => {
    if (messageEvent.type == MessageEventType.COPY) {
      return searchedTopicList && searchedTopicList.length > 0
    }
    else
    {
      return topicList && topicList.length > 0
    }
  }

  const DividerPlusDIV = ({ needLine }) => {
    return (
      <DividerPlusWrapper>
        { needLine&& <Divider /> }

        <div className="icon" onClick={() => setIsNewStream(true)}>
          <PlusIcon width={15} height={15} />
        </div>

        {isNewStream&& (
          <CreateStream caption="Create stream" createStreamFields = {createStreamFields} handleClose={() => setIsNewStream(false)} handleCreate={callback} />
        )}
      </DividerPlusWrapper>
    )
  }

  const OtherUserDataList = ({ data, handleClick}) => {
    return (
      <OtherUserWrapper>
        {/*<div className="title">*/}
        {/*  <div className="text">{ getCategoryText(metaCategory) }</div>*/}
        {/*  <Divider/>*/}
        {/*</div>*/}
        { data?.map( (data, idx) => (
            <div key={idx} className="text clickable" onClick={ () => handleClick(data) }>{data.name}</div>
          )
        ) }
      </OtherUserWrapper>
    )
  }

  const getTreeItemsFromData = (treeItems, depth = 1) => {
    return treeItems.map((treeItemData, index) => {
      let children = undefined

      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children, depth + 1)
      }

      return (
        <StyledTreeItem
          key={index}
          nodeId={treeItemData.id + ''}
          props={{ marginLeft: 4.5 * depth }}
          label={
            <StreamTopicItem
              onChecked={checkedTopic}
              onClicked={clickTopic}
              itemData={treeItemData}
              collapsed={collapsedFlags[1]}
            />
          }
          children={children}
        />
      )
    })
  }

  return (
    <>
      { (metaCategory == MenuCategory.PROVIDER_TO_PATIENT || metaCategory == MenuCategory.PATIENT_TO_PROVIDER)&& (
        <>
          <DividerPlusDIV needLine={metaCategory == MenuCategory.PROVIDER_TO_PATIENT} />
          <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
                    disableSelection={true}
          >
          { getTreeItemsFromData(messageEvent.type == MessageEventType.COPY ? searchedTopicList :  topicList) }
          </TreeView>
        </>
      ) }
      { (metaCategory == MenuCategory.PATIENT_FOR_ASSISTANT || metaCategory == MenuCategory.STAFF_TO_PATIENT)&& (
        hasDividerLine()&& (
          <>
            <DividerPlusDIV needLine={metaCategory == MenuCategory.STAFF_TO_PATIENT}/>
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              { getTreeItemsFromData(messageEvent.type == MessageEventType.COPY ? searchedTopicList :  topicList) }
            </TreeView>
          </>
        )
      ) }
      { (metaCategory == MenuCategory.APPOINTMENT)&&
        <>
          <OtherUserDataList handleClick={clickAppointment} data={otherUserList} />
          { hasDividerLine()&& <DividerPlusDIV/> }
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            { getTreeItemsFromData(messageEvent.type == MessageEventType.COPY ? searchedTopicList :  topicList) }
          </TreeView>
        </>
      }
      { metaCategory == MenuCategory.AGGREGATE_MESSAGE&&
        <>
          <OtherUserDataList handleClick={clickAggregate} data={otherUserList} />
          { hasDividerLine()&& <DividerPlusDIV/> }
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            { getTreeItemsFromData(messageEvent.type == MessageEventType.COPY ? searchedTopicList :  topicList) }
          </TreeView>
        </>
      }
      { (metaCategory == MenuCategory.ROOM)&& <></> }
      { (metaCategory == MenuCategory.SCRIBE)&&
        <OtherUserDataList handleClick={clickScribe} data={otherUserList} />
      }
      { (metaCategory == MenuCategory.ASSISTANT)&&
        <>
          <OtherUserDataList handleClick={clickAssistant} data={otherUserList} />
          { hasDividerLine()&& <DividerPlusDIV/> }
          <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
          >
            { getTreeItemsFromData(messageEvent.type == MessageEventType.COPY ? searchedTopicList :  topicList) }
          </TreeView>
        </>
      }


    </>
  )
}

export default StreamTopicList
