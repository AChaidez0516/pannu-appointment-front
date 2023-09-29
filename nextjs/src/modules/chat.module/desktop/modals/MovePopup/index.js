import Modal from '../../../../../components/Modal'
import Search from '../../layouts/Search'
import RadioBox from '../../../../../components/RadioBox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeView from '@mui/lab/TreeView'
import FormControlLabel from '@mui/material/FormControlLabel'

import { useState } from 'react'
import { useTopicList } from '../../../../../redux/hooks/useChatStore'
import { ROOMS } from '../../../shared/constants'
import {
  MoveWrapper, StyledTreeItem,
} from './styled'
import { SearchOptionIcon } from '../../../../../common/utils/Icons'

export default function MovePopup({ open, handleClose }) {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Rooms', checked: true },
    { id: 2, name: 'My contacts', checked: false },
    { id: 3, name: 'Facility directory', checked: false },
  ])

  const [modes, setModes] = useState([
    { id: 1, name: 'Existing', checked: true },
    { id: 2, name: 'New', checked: false }
  ])

  const [selectedTopics, setSelectedTopics] = useState([])
  const { topicList } = useTopicList()
  const [roomList, setRoomList] = useState(ROOMS)
  const [restrictedTopicList, setRestrictedTopicList] = useState(topicList)

  const getTreeItemsFromData = (treeItems, hierarchicalId, depth = 1) => {
    return treeItems?.map((treeItemData) => {
      let children = undefined

      if (treeItemData.children && treeItemData.children.length > 0) {
        const s = hierarchicalId.length == 0 ? treeItemData.id : hierarchicalId + '-' + treeItemData.id
        children = getTreeItemsFromData(treeItemData.children, s, depth + 1)
      }

      const hasChild = treeItemData.children.length > 0

      return (
        <StyledTreeItem
          key={treeItemData.id}
          nodeId={`${treeItemData.id}`}
          props={{ marginLeft: 17 * depth }}
          label={
            !hasChild ? (
              <FormControlLabel
                value={treeItemData.id}
                control={<RadioBox options={{size: {width: 16, height: 16}, marginTop: 1}}
                                status={ selectedTopics.find(v => v.id == treeItemData.id) ? true : false }
                                onClick={ () => handleTopic(treeItemData) }/>}
                label={<label className="label">{treeItemData.name}</label>}
              />
            ) : (
              <label className="label bold">{treeItemData.name}</label>
            )
          }
          children={children}
        />
      )

    })
  }

  const handleCategory = (categoryId) => {
    categories.forEach( c => c.checked = c.id === categoryId )
    setCategories([...categories])

    if (categoryId == 1) {
      setRoomList([...ROOMS])
    }
    else {
      setRoomList([])
    }
    setRestrictedTopicList([])

  }

  const handleMode = (modeId) => {
    modes.forEach( m => m.checked = m.id === modeId )
    setModes([...modes])
  }

  const clickRoom = (roomId) => {
    setRestrictedTopicList(topicList)
  }

  const handleTopic = (topic) => {
    setSelectedTopics([topic])
  }

  const searchTopic = (keyword) => {

  }

  return (
      <Modal isOpened={open}>
        <MoveWrapper>
          <div className="search-option">
            <span className="label">Move to</span>
            <Search onSearch={searchTopic} placeHolder="Search topic..." />
            <div className="icon"><SearchOptionIcon /></div>
          </div>
          <div className="radio-row">
            { categories.map( category =>
              <RadioBox key={category.id} status={category.checked} onClick={ () => handleCategory(category.id) }>
                <label>{category.name}</label>
              </RadioBox> ) }
          </div>
          <div className="radio-row">
            { modes.map( mode =>
              <RadioBox key={mode.id} status={mode.checked} onClick={ () => handleMode(mode.id) }>
                <label>{mode.name}</label>
              </RadioBox> ) }
          </div>
          <div className="dest">
            <div className="category scrollbar">
              { roomList.map((data, idx) => {
                return (
                  <div key={idx} className="one" onClick={ () => clickRoom(data.id) }>{data}</div>
                )
              }) }
            </div>
            <div className="detail scrollbar">
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                { getTreeItemsFromData(restrictedTopicList, '') }
              </TreeView>
            </div>
          </div>
          <div className="btn-row">
            <button className="btn" onClick={handleClose}>Cancel</button>
            <button className="btn blue">Okay</button>
          </div>
        </MoveWrapper>
      </Modal>
  )
}
