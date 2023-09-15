import { forwardRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import appSlice from '~/redux/slices/appSlice'

export const Video = forwardRef(({ video, ...props }, ref) => {
    const dispatch = useDispatch()
    return (
        <Link
            to={`/@${video.user.username}/video/${video._id}`}
            onClick={() =>
                dispatch(appSlice.actions.setIsSearchModalShow(false))
            }
        >
            <VideoElm {...props} ref={ref}>
                <source src={video.src} type="video/mp4" />
            </VideoElm>
        </Link>
    )
})

const VideoElm = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export default Video
