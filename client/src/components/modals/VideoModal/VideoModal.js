import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Content from './Content'
import { Wrapper } from './styled'
import * as videoService from '~/services/videoService'
import MobileContent from './MobileContent'
import MobileShare from './MobileContent/MobileShare'
import VideoContainer from './VideoContainer'
import ActionList from './MobileContent/ActionList'

export default function VideoModal() {
    const { videoID } = useParams()
    const [video, setVideo] = useState(null)
    const [showCommentContent, setShowCommentContent] = useState(false)
    const [showShareContent, setShowShareContent] = useState(false)

    useEffect(() => {
        ;(async () => {
            const video = await videoService.getVideo(videoID)
            setVideo(video)
        })()
    }, [videoID])

    if (!video) return

    return (
        <Wrapper className="modal">
            <div className="modal_inner">
                <VideoContainer video={video} />

                <Content video={video} />

                <div className="action-list-wrapper">
                    <ActionList
                        video={video}
                        OnOpenCommentContent={() =>
                            setShowCommentContent(!showCommentContent)
                        }
                        onOpenShareContent={() =>
                            setShowShareContent(!showShareContent)
                        }
                    />
                </div>

                <MobileContent
                    video={video}
                    showCommentContent={showCommentContent}
                    onHideCommentContent={() => setShowCommentContent(false)}
                />

                <MobileShare
                    showShareContent={showShareContent}
                    onHideShareContent={() => setShowShareContent(false)}
                />
            </div>
        </Wrapper>
    )
}
