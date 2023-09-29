import styled from 'styled-components'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { Popover } from '@mui/material'

import { useChatUser } from '../../../../redux/hooks/useCommonStore'
import { useSubscriberList } from '../../../../redux/hooks/useChatStore'

import {
  CopyIcon_1, PublishIcon,
  StarIcon, TrashIcon_1
} from '../../../../common/utils/Icons'
import { ChatUserRole } from '../../shared/constants'
import { ICONS } from '../../../../common/utils/styleGuide'


const Container = styled.div`
`
const MenuWrapper = styled.div`
  min-width: auto;
  left: 0; right: 0;
  background-color: white;
  display: inline-block;
  .item {
    padding: 5px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    .icon {
      width: 30px;
      display: flex;
      justify-content: flex-start;
    }
    &.parent .submenu {
      display: none;
      position: absolute;
      top: 10px;
      right: 0px;
      
      min-width: 150px;
      //box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      
      transform: translateX(100%);
      padding-top: 5px;
      .submenu-wrapper {
        position: relative;
        margin-left: 15px;
        .submenu-symbol {
          background-color: white;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          width: 15px;
          height: 15px;
          position: absolute;
          left: -8px; top: 0;
          transform: skewX(45deg);
          z-index: -1;
        }
        .submenu-body {
          cursor: default;
          background-color: white;
          .list {
            .one {
              display: flex;
              column-gap: 8px;
              height: 32px;
              align-items: center;
              padding: 0 16px;
              .check {

              }
              .txt {
                font-family: SF Pro Text;
                font-size: 12px;
                font-weight: 400;
                color: black;
              }
            }
          }
          .tool {
            padding: 0 0 10px;
            display: flex;
            justify-content: right;
            .btn {
              font-family: SF Pro Text;
              font-size: 12px;
              font-weight: 500;
              line-height: 14px;
              color: #173FD4;
              background-color: transparent;
              border: 0; outline: 0;
            }
          }
        }
      }
      
    }
  }
  .item:hover {
    background-color: #0065FB40;
    &.parent .submenu {
      display: block;
    }
  }
`
const WithIco = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 10px;
  color: #000000;
  cursor: pointer;
`
const WithOutIco = styled(WithIco)`
  padding: 5px 0px;
  margin-left: 28px;
  cursor: pointer;
`

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CheckBox from "../../../../components/CheckBox";
const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          overflowX: 'inherit',
          overflowY: 'inherit',
          overflow: 'inherit!important'
        },
      },
    },
  },
});

function MenuItems({
  handleReply,
  handleCopy,
  handleEdit,
  handleForward,
  handleMove,
  handleDelete,
  handleFollow,
  handleReminder,
  handleReportAbuse,
  handleLabels,
  handleClip,
  handleForward2Assistant2,
  handleForward2Receiver,
  handleForward2Other,
  handleSearchProvider,
  handleForwardAndMessage,
  message
}) {
  const { chatUser } = useChatUser()
  const { subscriberList } = useSubscriberList()

  const [selectedUserList, setSelectedUserList] = useState({})
  const [menuPopupOptions, setMenuPopupOptions] = useState({ opened: false, anchorEl: null })
  const closeMenuPopup = () => {
    setMenuPopupOptions({ opened: false, anchorEl: null })
  }

  const setSelectedUser = (user, checked) => {
    if (checked) {
      let t = {...selectedUserList}
      t[user.id] = user
      setSelectedUserList(t)
    }
    else {
      let t = {...selectedUserList}
      delete t[user.id]
      setSelectedUserList(t)
    }
  }

  return (
    <>
    <Container onClick={ (e) => setMenuPopupOptions({ opened: true, anchorEl: e.currentTarget }) }>
      <Image width={5} height={14} src="/assets/images/svg/menu.svg" />
    </Container>
      <ThemeProvider theme={theme}>
      <Popover
        open={menuPopupOptions.opened}
        anchorEl={menuPopupOptions.anchorEl}
        onClose={closeMenuPopup}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        style={{ marginTop: 10 }}
      >
        <MenuWrapper>
          { chatUser.role_id == ChatUserRole.PROVIDER&&
            <div className="item" onClick={ () => {
              closeMenuPopup()
              handleClip()
            } }>
              <WithOutIco>Clip</WithOutIco>
            </div>
          }
          { chatUser.role_id == ChatUserRole.ASSISTANT&&
            <div className="item" onClick={ () => {
              closeMenuPopup()
              handleSearchProvider()
            } }>
              <WithOutIco>Search provider</WithOutIco>
            </div>
          }
          { (chatUser.role_id == ChatUserRole.ASSISTANT)&&
            <>
              <div className="item" onClick={ () => {
                closeMenuPopup()
                handleForward2Receiver()
              } }>
                <WithOutIco>Forward to receiver</WithOutIco>
              </div>
              <div className="item parent">
                <WithOutIco>Forward to other</WithOutIco>
                <div className="submenu">
                  <div className="submenu-wrapper">
                    <div className="submenu-symbol">&nbsp;</div>
                    <div className="submenu-body">
                      <div className="list">
                        { subscriberList.map(v => (
                          <div className="one" key={v.id}>
                            <span className="check"><CheckBox onChange={(checked) => setSelectedUser(v, checked)} /></span>
                            <span className="txt">{v.name}</span>
                          </div>
                        )) }
                      </div>
                      <div className="tool">
                        <button className="btn" onClick={() => {
                          closeMenuPopup()
                          handleForward2Other(Object.keys(selectedUserList))
                        } }>Okay</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
          <div className="item" onClick={handleReply}>
            <div className="icon"><Image src={ICONS.reply} width={20} height={19} /></div>
            <WithIco>Reply</WithIco>
          </div>
          { (chatUser.role_id == ChatUserRole.ASSISTANT)&&
            <div className="item" onClick={ () => {
              closeMenuPopup()
              handleForwardAndMessage()
            } }>
              <WithOutIco>Forward + Add message</WithOutIco>
            </div>
          }
          { (chatUser.role_id == ChatUserRole.PROVIDER || chatUser.role_id == ChatUserRole.PATIENT)&&
            <div className="item" onClick={ () => {
              closeMenuPopup()
              handleForward()
            } }>
              <div className="icon"><Image src={ICONS.forward} width={20} height={19} /></div>
              <WithIco>Forward</WithIco>
            </div>
          }
          <div className="item" onClick={ () => {
            closeMenuPopup()
            handleFollow()
          } }>
            <div className="icon"><StarIcon  /></div>
            <WithIco>Follow</WithIco>
          </div>

          { (chatUser.role_id == ChatUserRole.PROVIDER || chatUser.role_id == ChatUserRole.PATIENT)&&
            <>
              <div className="item" onClick={ () => {
                closeMenuPopup()
                handleCopy()
              } }>
                <div className="icon"><CopyIcon_1 /></div>
                <WithIco>Copy</WithIco>
              </div>
              <div className="item" onClick={ () => {
                closeMenuPopup()
                handleMove()
              } }>
                <WithOutIco>Move message</WithOutIco>
              </div>
            </>
          }
          {chatUser && chatUser.id == message.createdBy &&
            <>
              <div className="item" onClick={ () => {
                closeMenuPopup()
                handleEdit()
              } }>
                <div className="icon"><Image src={ICONS.edit} width={24} height={21}></Image></div>
                <WithIco>Edit</WithIco>
              </div>
              <div className="item" onClick={ () => {
                closeMenuPopup()
                handleDelete()
              } }>
                <div className="icon"><TrashIcon_1 /></div>
                <WithIco>Delete</WithIco>
              </div>
            </>
          }
          <div className="item" onClick={ () => {
            closeMenuPopup()
            handleReminder()
          } }>
            <div className="icon"><Image src={ICONS.bell2} width={16} height={17}></Image></div>
            <WithIco>Set reminder</WithIco>
          </div>
          <div className="item" onClick={ () => {
            closeMenuPopup()
            handleReminder()
          } }>
            <div className="icon"><PublishIcon /></div>
            <WithIco>Publish</WithIco>
          </div>
          <div className="item" onClick={ () => {
            closeMenuPopup()
            handleLabels()
          } }>
            <WithOutIco>Labels</WithOutIco>
          </div>
          <div className="item" onClick={ () => {
            closeMenuPopup()
            handleReportAbuse()
          } }>
            <WithOutIco>Report abuse</WithOutIco>
          </div>
        </MenuWrapper>
      </Popover>
      </ThemeProvider>
    </>
  )
}


export default MenuItems