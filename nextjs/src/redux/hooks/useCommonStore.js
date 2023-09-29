import { setLoadingStatus, selectLoadingStatus } from '../reducers/connectionSlice'
import { setUser, setIDCard, setChatUser,
    selectRegUser, selectAuthUser, selectChatUser,
    selectIDCard } from '../reducers/authSlice'
import { useSelector, useDispatch } from 'react-redux'

export const useRegUser = () => {
    const dispatch = useDispatch()
    const regUser = useSelector(selectRegUser)

    const commitRegUser= (data) => {
        dispatch(setUser(data))
    }
    return { regUser, commitRegUser }
}

export const useAuthUser = () => {
    //const dispatch = useDispatch()
    const authUser = useSelector(selectAuthUser)

    return { authUser }
}

export function useChatUser() {
    const dispatch = useDispatch()
    const chatUser = useSelector(selectChatUser)

    const commitChatUser = (data) => {
        dispatch(setChatUser(data))
    }
    return { chatUser, commitChatUser }
}

export const useIDCardData = () => {
    const dispatch = useDispatch()
    const idcardData = useSelector(selectIDCard)

    const commitIDCardData = (data) => {
        dispatch(setIDCard)
    }

    return { idcardData, commitIDCardData }
}

export const useLoadingStatus = () => {
    const dispatch = useDispatch()
    const loadingStatus = useSelector(selectLoadingStatus)

    const commitLoadingStatus = (status) => {
        dispatch(setLoadingStatus(status))
    }

    return { loadingStatus, commitLoadingStatus }
}

export default useRegUser