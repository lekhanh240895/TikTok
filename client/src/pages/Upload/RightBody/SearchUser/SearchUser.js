import { useEffect, useRef, useState } from 'react'
import Avatar from '~/components/Avatar'
import { SearchIcon, TimesIcon } from '~/components/Icons'
import * as userService from '~/services/userService'
import { useDebounce } from '~/hooks/useDebounce'
import { Wrapper } from './styled'
import { useSelector } from 'react-redux'
import { authSelector, usersSelector } from '~/redux/selectors'
import { setLocalData } from '~/utils/setLocalData'

export default function SearchUser({ input, setInput, setSelectFormShow }) {
    const [recommendUsers, setRecommendUsers] = useState([])
    const [searchUsers, setSearchUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [searchValue, setSeachValue] = useState('')
    const { users } = useSelector(usersSelector)
    const { currentUser } = useSelector(authSelector)

    const searchInputRef = useRef(null)
    const deferredQuery = useDebounce(searchValue, 500)
    const recentUserSearch =
        JSON.parse(localStorage.getItem('recentUsersSearch')) || []

    useEffect(() => {
        if (selectedUsers.length > 0) {
            const recommendUsers = searchUsers.filter(
                (user) => !selectedUsers.includes(`@${user.username}`)
            )
            setRecommendUsers(recommendUsers)
        } else {
            setRecommendUsers(searchUsers)
        }
    }, [searchUsers, selectedUsers])

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus()
        }
    })

    useEffect(() => {
        if (deferredQuery) {
            ;(async () => {
                const searchUsers = await userService.searchUser(deferredQuery)
                setSearchUsers(searchUsers)
            })()
        } else {
            if (currentUser) {
                const followings = users.filter((user) =>
                    currentUser.followings.includes(user._id)
                )
                setSearchUsers(followings)
            }
        }
    }, [deferredQuery, currentUser, users])

    useEffect(() => {
        const selectedUsers = input?.match(/@\w+\S*/g)

        if (selectedUsers === null) {
            setSelectedUsers([])
        } else {
            setSelectedUsers(selectedUsers)
        }
    }, [input])

    const handleSelectUser = (username) => {
        setSelectFormShow(false)
        setSeachValue('')
        searchInputRef.current.focus()

        if (!recentUserSearch.some((u) => u === `@${username}`)) {
            setLocalData(
                'recentUsersSearch',
                recentUserSearch.concat(`@${username}`)
            )
        }

        if (input[input.length - 1] === '@') {
            const newInput = input.slice(0, -1)
            setInput(newInput.concat(`@${username} `))
        } else {
            setInput(input.concat(`@${username} `))
        }
    }

    const recentUsersSearch = users.filter((user) =>
        recentUserSearch?.includes(`@${user.username}`)
    )

    return (
        <Wrapper className="input-container">
            <span className="search-icon icon-wrapper">
                <SearchIcon width="1.8rem" height="1.8rem" />
            </span>
            <span
                className="close-icon icon-wrapper"
                onClick={() => setSelectFormShow(false)}
            >
                <TimesIcon width="2.4rem" height="2.4rem" />
            </span>

            <input
                type="text"
                maxLength={150}
                className="input search-input"
                id="search-user"
                value={searchValue}
                onChange={(e) => setSeachValue(e.target.value)}
                ref={searchInputRef}
            />

            <div className="user-search-container">
                <div className="user-search">
                    <div className="select-column">
                        <div className="select-title">
                            {searchValue ? 'All users' : 'Following'}
                        </div>

                        <ul className="select-list">
                            {recommendUsers.map((user) => (
                                <li
                                    className="select-item"
                                    key={user._id}
                                    onClick={() =>
                                        handleSelectUser(user.username)
                                    }
                                >
                                    <div className="avatar-wrapper">
                                        <Avatar
                                            width="4.8rem"
                                            height="4.8rem"
                                            src={user.avatar}
                                        />
                                    </div>
                                    <div className="user-info">
                                        <h4 className="name">
                                            {user.full_name}
                                        </h4>
                                        <h5 className="username">
                                            {user.username}
                                        </h5>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="select-column">
                        <div className="select-title">Recent</div>
                        <ul className="select-list">
                            {recentUsersSearch.map((user) => (
                                <li
                                    className="select-item"
                                    key={user._id}
                                    onClick={() =>
                                        handleSelectUser(user.username)
                                    }
                                >
                                    <div className="avatar-wrapper">
                                        <Avatar
                                            width="4.8rem"
                                            height="4.8rem"
                                            src={user.avatar}
                                        />
                                    </div>

                                    <div className="user-info">
                                        <h4 className="name">
                                            {user.full_name}
                                        </h4>
                                        <h5 className="username">
                                            {user.username}
                                        </h5>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
