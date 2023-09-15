import { useNavigate } from 'react-router-dom'
import { TimesIcon, FlagIcon, TiktokIcon, SearchIcon } from '~/components/Icons'
import { Wrapper } from './styled'
import { useDispatch } from 'react-redux'
import appSlice from '~/redux/slices/appSlice'

export default function Header({ handlePlay }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClose = () => {
        navigate('/')
    }

    const handleSearch = () => {
        dispatch(appSlice.actions.setIsSearchModalShow(true))
        handlePlay()
        navigate('/search')
    }
    return (
        <Wrapper className="header">
            <div className="left">
                <span className="close-btn icon-wrapper" onClick={handleClose}>
                    <TimesIcon width="2.6rem" height="2.6rem" />
                </span>
                <span
                    className="search-btn icon-wrapper"
                    onClick={handleSearch}
                >
                    <SearchIcon width="2.6rem" height="2.6rem" />
                </span>
                <span className="tiktok-icon">
                    <TiktokIcon width="4rem" height="4rem" />
                </span>
            </div>
            <div className="right">
                <span className="report-icon">
                    <FlagIcon width="1.6rem" height="1.5rem" />
                </span>
                Report
            </div>
        </Wrapper>
    )
}
