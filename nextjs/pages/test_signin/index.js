import { useState } from 'react'
import { login } from '../../src/common/lib/chat'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import PageLayout from "../../src/components/PageLayout";
import { useLoadingStatus, useChatUser } from "../../src/redux/hooks/useCommonStore";

const userList = {
  'provider': {
    id: 1,
    email: 'ican.do.everything.8695@gmail.com',
    password: '#abcd1234',
    role: 4
  },
  'patient': {
    id: 2,
    email: 'noelshytin18@gmail.com',
    password: '#abcd1234',
    role: 5
  },
  'assistant': {
    id: 3,
    email: 'samuel.zhang.moon@gmail.com',
    password: '#abcd1234',
    role: 3
  },
  'staff': {
    id: 5,
    email: 'xiaonan.wang90411@gmail.com',
    password: '#abcd1234',
    role: 2
  },
  'scribe': {
    id: 4,
    email: 'zheren.zheng1990411@gmail.com',
    password: '#abcd1234',
    role: 6
  }
}

function Index() {
  const { chatUser, commitChatUser } = useChatUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState(userList[0])
  const [selectedRole, setSelectedRole] = useState(0)
  const changeUser = (id) => {
    const user = userList.find(v => v.id == id)
    setSelectedUser(user)
    setSelectedRole(user.roles[0])
  }

  function loginProc(role) {
    // if (!selectedUser || selectedRole == 0) return;
    let user = userList[role]

    if (!user)
      return

    commitLoadingStatus(true)

    login(user.email, user.password, user.role).then(res => {
      commitLoadingStatus(false)
      if (res && res.id > 0) {
        const {__typename, currentRoleId: role_id, ...data} = res
        commitChatUser({ role_id, ...data });
        //commitChatUser({...res})

        router.push('/chat')
      } else {
        toast.error("Please input correct email and password");
      }
    })
  }

  return (
    <PageLayout>
      <div style={{ display: 'flex', flexDirection: 'column', rowGap:20, justifyContent: 'center', marginTop: 10, alignItems: 'center', height: '90vh' }}>
        <button style={{ fontSize: 28, width: 250, height: 50 }} onClick={() => loginProc('provider')}>Provider</button>
        <button style={{ fontSize: 28, width: 250, height: 50 }} onClick={() => loginProc('patient')}>Patient</button>
        <button style={{ fontSize: 28, width: 250, height: 50 }} onClick={() => loginProc('assistant')}>Assistant</button>
        <button style={{ fontSize: 28, width: 250, height: 50 }} onClick={() => loginProc('staff')}>Staff</button>
        <button style={{ fontSize: 28, width: 250, height: 50 }} onClick={() => loginProc('scribe')}>Scribe</button>
      </div>
      {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <div>
            <div>Email</div>
            <div>
              <select style={{ width: 175 }} value={selectedUser?.id} onChange={(e) => changeUser(e.target.value)}>
                { userList.map(user => (
                  <option key={user.id} value={user.id}>{user.email}</option>
                )) }
              </select>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <div>
            <div>Password</div>
            <div>
              <input type='password' value={selectedUser?.password} readOnly={true} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <div>
            <div>Role</div>
            <div>
              <select style={{ width: 175 }} value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                { selectedUser?.roles.map(roleId => (
                  <option key={`${roleId}`} value={`${roleId}`}>{roleList.find(v => v.id == roleId)?.name}</option>
                )) }
              </select>
            </div>
          </div>
        </div>
        <div align="center" style={{ marginTop: 10 }}><button onClick={loginProc}>Sign in</button></div> */}

    </PageLayout>
  )
}


export default Index
