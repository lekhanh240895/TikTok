import { useNavigate } from 'react-router-dom'
import { TimesIcon, FlagIcon, TiktokIcon } from '~/components/Icons'
import { Wrapper } from './styled'

export default function Header() {
    const navigate = useNavigate()

    const handleClose = () => {
        navigate(-1)
    }
    return (
        <Wrapper className="header">
            <div className="left">
                <span className="close-btn icon-wrapper" onClick={handleClose}>
                    <TimesIcon width="2.6rem" height="2.6rem" />
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
