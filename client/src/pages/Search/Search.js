import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { RegularPlayIcon, SearchIcon } from '~/components/Icons'
import Image from '~/components/Image'
import ShareVideoItem from '~/components/ShareVideoItem'
import { usersSelector, videosSelector } from '~/redux/selectors'
import { configNumber } from '~/services'
import { formatDate } from '~/services/formatDate'
import AccountItem from '~/components/AccountItem'
import {
    Container,
    VideoItem,
    VideoList,
    NavList,
    NavItem,
    Line,
    SearchForm,
} from './styled'

export default function Search() {
    const [activeTab, setActiveTab] = useState('topVideos')
    const lineRef = useRef(null)
    const { videos } = useSelector(videosSelector)
    const { users } = useSelector(usersSelector)
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const [searchValue, setSearchValue] = useState('')
    const inputRef = useRef()

    useEffect(() => {
        if (query) {
            setSearchValue(query)
        }
    }, [query])

    useEffect(() => {
        if (inputRef) inputRef.current.focus()
    })

    const topVideos = videos.filter(
        (video) =>
            video.views >= 1000000 &&
            video.likes.length >= 1 &&
            (video.title.toLowerCase().includes(query.toLowerCase()) ||
                video.music.toLowerCase().includes(query.toLowerCase()))
    )

    const accounts = users.filter(
        (user) =>
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.full_name.toLowerCase().includes(query.toLowerCase())
    )

    const otherVideos = videos.filter(
        (video) =>
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.music.toLowerCase().includes(query.toLowerCase())
    )

    useEffect(() => {
        if (topVideos.length < 1) {
            if (accounts.length > 0) {
                setActiveTab('accounts')
                handleHoverNavItem('accounts')
            } else if (videos.length > 0) {
                setActiveTab('videos')
                handleHoverNavItem('videos')
            }
        } else {
            setActiveTab('topVideos')
            handleHoverNavItem('topVideos')
        }
    }, [accounts.length, topVideos.length, videos.length])

    const handleHoverNavItem = (name) => {
        const elmWidth = navItemRef.current.offsetWidth
        switch (name) {
            case 'accounts':
                return (lineRef.current.style.transform = `translateX(${elmWidth}px)`)
            case 'videos':
                return (lineRef.current.style.transform = `translateX(${
                    elmWidth + elmWidth
                }px)`)
            default:
                return (lineRef.current.style.transform = 'translateX(0)')
        }
    }

    const handleClickItem = (tab) => {
        setActiveTab(tab)
    }

    const navItemRef = useRef(null)

    const handleChange = (e) => {
        const searchValue = e.target.value

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }

    return (
        <Container>
            <SearchForm>
                <input
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    type="text"
                    value={searchValue}
                    ref={inputRef}
                    onChange={handleChange}
                    name="q"
                />
                <button
                    type="submit"
                    className="search-btn icon-wrapper"
                    onMouseDown={(e) => e.preventDefault()}
                    disabled={!searchValue}
                >
                    <SearchIcon width="2.4rem" height="2.4rem" />
                </button>
            </SearchForm>

            <NavList>
                <NavItem
                    active
                    onMouseOver={() => handleHoverNavItem('topVideos')}
                    onClick={() => handleClickItem('topVideos')}
                    ref={navItemRef}
                >
                    Top
                </NavItem>

                <NavItem
                    active
                    onMouseOver={() => handleHoverNavItem('accounts')}
                    onClick={() => handleClickItem('accounts')}
                >
                    Accounts
                </NavItem>

                <NavItem
                    onMouseOver={() => handleHoverNavItem('videos')}
                    onClick={() => handleClickItem('videos')}
                >
                    Videos
                </NavItem>

                <Line ref={lineRef}></Line>
            </NavList>

            {activeTab === 'accounts' ? (
                <ul>
                    {accounts.map((account) => (
                        <li key={account._id}>
                            <AccountItem user={account} />
                        </li>
                    ))}
                </ul>
            ) : (
                <VideoList>
                    {(activeTab === 'topVideos' ? topVideos : otherVideos).map(
                        (video) => {
                            return (
                                <VideoItem key={video._id}>
                                    <ShareVideoItem video={video}>
                                        <div className="play-line">
                                            <div className="user-info">
                                                <Image
                                                    src={video.user.avatar}
                                                    className="avatar"
                                                    alt="avatar"
                                                />
                                                <span className="username">
                                                    {video.user.username}
                                                </span>
                                            </div>

                                            <div className="play-card">
                                                <RegularPlayIcon
                                                    width="1.6rem"
                                                    height="1.6rem"
                                                />
                                                <span>
                                                    {configNumber(video.views)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="sub-content">
                                            <span className="video-time">
                                                {formatDate(video.createdAt)}
                                            </span>
                                        </div>
                                    </ShareVideoItem>
                                </VideoItem>
                            )
                        }
                    )}
                </VideoList>
            )}
        </Container>
    )
}
