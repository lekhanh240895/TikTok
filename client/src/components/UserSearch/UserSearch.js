import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar'

function UserSearch({ searchValue, onSelectUser }) {
    const [recommendUsers, setRecommendUsers] = useState([])

    return (
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
                            onClick={onSelectUser}
                        >
                            <div className="avatar-wrapper">
                                <Avatar
                                    width="4.8rem"
                                    height="4.8rem"
                                    src={user.avatar}
                                />
                            </div>
                            <div className="user-info">
                                <h4 className="name">{user.full_name}</h4>
                                <h5 className="username">{user.username}</h5>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="select-column">
                <div className="select-title">Recent</div>
                <ul className="select-list">
                    <li className="select-item">
                        <Avatar width="4.8rem" height="4.8rem" src="" />
                        <div className="user-info">
                            <h4 className="name">Lê Khánh</h4>
                            <p className="username">@lekhanhhh</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserSearch
