import { useNavigate, useParams } from 'react-router-dom'
import {
    BlockIcon,
    CheckedIcon,
    EditIcon,
    FlagIcon,
    IsFriendIcon,
    LockIcon,
    MoreIcon,
    RegularPlayIcon,
    ShareIcon,
} from '~/components/Icons'
import Image from '~/components/Image'
import Button from '~/components/Button'
import { configNumber } from '~/services'
import { Container } from './styled'
import { useEffect, useRef, useState } from 'react'
import Tippy from '@tippyjs/react'
import { useDispatch, useSelector } from 'react-redux'
import {
    appSelector,
    authSelector,
    usersSelector,
    videosSelector,
} from '~/redux/selectors'
import editModalSlice from '~/redux/slices/editModalSlice'
import { followUser, unfollowUser } from '~/redux/slices/usersSlice'
import authSlice from '~/redux/slices/authSlice'
import loginModalSlice from '~/redux/slices/loginModalSlice'
import ShareVideoItem from '~/components/ShareVideoItem'
import Menu from '~/components/Popper/Menu'

import {
    CodeIcon,
    CopyIcon,
    FacebookIcon,
    LineIcon,
    LinkedInIcon,
    MailIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from '~/components/Icons'
import * as conversationService from '~/services/conversationService'
import * as notificationService from '~/services/notificationService'
import appSlice from '~/redux/slices/appSlice'

const SHARE_MENU = [
    {
        icon: <CodeIcon width="2.6rem" height="2.6rem" />,
        title: 'Embed',
    },
    {
        icon: <FacebookIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Facebook',
    },
    {
        icon: <WhatsappIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Whatsapp',
    },
    {
        icon: <TwitterIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Twitter',
    },
    {
        icon: <CopyIcon width="2.6rem" height="2.6rem" />,
        title: 'Copy link',
    },
    {
        icon: <LinkedInIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to LinkedIn',
    },
    {
        icon: <RedditIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Reddit',
    },
    {
        icon: <TelegramIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Telegram',
    },
    {
        icon: <MailIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Email',
    },
    {
        icon: <LineIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Line',
    },
    {
        icon: <PinterestIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Pinterest',
    },
]

const MORE_MENU = [
    {
        icon: <FlagIcon width="1.6rem" height="1.6rem" />,
        title: 'Report',
    },
    {
        icon: <BlockIcon width="1.6rem" height="1.6rem" />,
        title: 'Block',
    },
]

const AVATAR_MENU = [
    {
        icon: <ShareIcon width="1.6rem" height="1.6rem" />,
        title: 'Share',
        children: {
            title: 'Share',
            data: SHARE_MENU,
        },
    },
    {
        icon: <MoreIcon width="1.6rem" height="1.6rem" />,
        title: 'More options',
        children: {
            title: 'Options',
            data: MORE_MENU,
        },
    },
]

export default function Profile() {
    const { users } = useSelector(usersSelector)
    const { currentUser } = useSelector(authSelector)
    const { videos } = useSelector(videosSelector)
    const { socket } = useSelector(appSelector)
    const [activeTab, setActiveTab] = useState('videos')
    const [isUser, setIsUser] = useState(false)
    const [isFollowed, setIsFollowed] = useState(false)
    const dispatch = useDispatch()
    const lineRef = useRef(null)
    const { username } = useParams()

    const user = users?.find((user) => user.username === username)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?._id === currentUser?._id) {
            setIsUser(true)
        } else {
            setIsUser(false)

            if (currentUser?.followings?.includes(user._id)) {
                setIsFollowed(true)
            } else {
                setIsFollowed(false)
            }
        }
    }, [users, user, currentUser])

    useEffect(() => {
        if (lineRef.current) {
            handleHoverNavItem('videos')
            setActiveTab('videos')
        }
    }, [user])

    const handleHoverNavItem = (name) => {
        if (name === 'liked') {
            lineRef.current.style.transform = `translateX(${lineRef.current.offsetWidth}px)`
        } else if (name === 'videos') {
            lineRef.current.style.transform = 'translateX(0)'
        }
    }

    const userVideos = videos.filter((video) => video.user?._id === user?._id)
    const likeCount = userVideos.reduce((total, cur) => {
        return (total += cur.likes.length)
    }, 0)

    const likedVideos = videos.filter((video) =>
        video.likes?.includes(user?._id)
    )

    const handleClickItem = (tab) => {
        setActiveTab(tab)
    }

    const handleFollow = async () => {
        if (!currentUser) return dispatch(loginModalSlice.actions.show())
        const updatedUser = {
            ...currentUser,
            followings: currentUser.followings.concat(user._id),
        }
        dispatch(authSlice.actions.setCurrentUser(updatedUser))
        dispatch(followUser(user._id))

        const data = {
            receiver: user._id,
            type: 'follow',
            sender: currentUser,
        }

        socket.emit('sendNotification', data)

        await notificationService.create({
            ...data,
            createdAt: new Date(),
        })
    }

    const handleUnFollow = () => {
        if (!currentUser) return dispatch(loginModalSlice.actions.show())

        const updatedUser = {
            ...currentUser,
            followings: currentUser.followings.filter((id) => id !== user._id),
        }
        dispatch(authSlice.actions.setCurrentUser(updatedUser))
        dispatch(unfollowUser(user._id))
    }

    const handleMessage = async () => {
        const conversation = await conversationService.create(user._id)
        dispatch(appSlice.actions.setSelectedConversationID(conversation._id))
        navigate('/messages')
    }

    if (!user) return
    return (
        <Container className="profile">
            <div className="header">
                <div className="share-info">
                    <div className="avatar">
                        <Image src={user.avatar} alt={user.full_name} />

                        <Menu
                            items={AVATAR_MENU}
                            placement="bottom"
                            style={{ width: '180px' }}
                            trigger="click"
                        >
                            <span className="mobile-more-icon">
                                <MoreIcon width="1.8rem" height="1.8rem" />
                            </span>
                        </Menu>
                    </div>

                    <div className="share-title">
                        <h2>
                            {user.username}
                            {user.tick && (
                                <CheckedIcon width="2rem" height="2rem" />
                            )}
                        </h2>
                        <h4>{user.full_name}</h4>

                        {isUser && (
                            <Button
                                secondary
                                leftIcon={
                                    <EditIcon width="2rem" height="2rem" />
                                }
                                onClick={() =>
                                    dispatch(editModalSlice.actions.show())
                                }
                            >
                                Edit profile
                            </Button>
                        )}

                        {!isUser &&
                            (!isFollowed ? (
                                <Button primary onClick={handleFollow}>
                                    Follow
                                </Button>
                            ) : (
                                <div className="button-group">
                                    <Button
                                        className="styled-btn"
                                        outline
                                        onClick={handleMessage}
                                    >
                                        Messages
                                    </Button>

                                    <Tippy
                                        placement="bottom"
                                        content="Unfollow"
                                    >
                                        <span
                                            className="friend-icon icon-wrapper"
                                            onClick={handleUnFollow}
                                        >
                                            <IsFriendIcon
                                                width="2rem"
                                                height="2rem"
                                            />
                                        </span>
                                    </Tippy>
                                </div>
                            ))}

                        <div className="header-actions">
                            <Menu
                                items={SHARE_MENU}
                                style={{ width: '280px', maxHeight: '448px' }}
                                moreArrow
                                offset={[7, 12]}
                                delay={[200, 500]}
                            >
                                <span className="share-icon">
                                    <ShareIcon width="2.4rem" height="2.4rem" />
                                </span>
                            </Menu>

                            {!isUser && (
                                <Menu
                                    items={MORE_MENU}
                                    placement="bottom-end"
                                    style={{ width: '180px' }}
                                >
                                    <span className="more-icon">
                                        <MoreIcon
                                            width="2.4rem"
                                            height="2.4rem"
                                        />
                                    </span>
                                </Menu>
                            )}
                        </div>
                    </div>
                </div>

                <div className="user-stats-wrapper">
                    <div className="user-stats">
                        <span>{configNumber(user.followings?.length)}</span>
                        Following
                    </div>
                    <div className="user-stats">
                        <span>{configNumber(user.followers?.length)}</span>
                        Followers
                    </div>
                    <div className="user-stats">
                        <span>{configNumber(likeCount)}</span>Likes
                    </div>
                </div>

                <div className="bio">{user.bio}</div>
            </div>

            <ul className="nav-list">
                <li
                    className={
                        activeTab === 'videos' ? 'nav-item active' : 'nav-item'
                    }
                    onMouseEnter={() => handleHoverNavItem('videos')}
                    onClick={() => handleClickItem('videos')}
                >
                    Videos
                </li>

                <li
                    className={
                        activeTab === 'liked' ? 'nav-item active' : 'nav-item'
                    }
                    onMouseEnter={() => handleHoverNavItem('liked')}
                    onClick={() => handleClickItem('liked')}
                >
                    <span>
                        <LockIcon width="1.8rem" height="1.8rem" />
                    </span>
                    Liked
                </li>

                <div className="line" ref={lineRef}></div>
            </ul>

            <div className="video-list">
                {(activeTab === 'videos' ? userVideos : likedVideos).map(
                    (video) => (
                        <div className="video-item" key={video._id}>
                            <ShareVideoItem video={video}>
                                <div className="sub-content">
                                    <span className="icon-wrapper">
                                        <RegularPlayIcon
                                            width="1.8rem"
                                            height="1.8rem"
                                        />
                                    </span>
                                    <span className="video-info">
                                        {configNumber(video.views)}
                                    </span>
                                </div>
                            </ShareVideoItem>
                        </div>
                    )
                )}
            </div>
        </Container>
    )
}
