import { configNumber } from '~/services';
import { CommentIcon, SolidHeartIcon, ShareIcon2 } from '~/components/Icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import { appSelector, authSelector } from '~/redux/selectors';
import { likeVideo } from '~/redux/slices/videosSlice';
import * as notificationService from '~/services/notificationService';
import { Wrapper } from './styled';

export default function ActionList({
    video,
    OnOpenCommentContent,
    onOpenShareContent,
}) {
    const [likes, setLikes] = useState(video.likes?.length);
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useDispatch();
    const { currentUser } = useSelector(authSelector);
    const { socket } = useSelector(appSelector);

    useEffect(() => {
        setIsLiked(video.likes.includes(currentUser?._id));
    }, [currentUser, video]);

    const handleLike = async () => {
        if (!currentUser) {
            return dispatch(loginModalSlice.actions.show());
        }

        dispatch(likeVideo(video._id));
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);

        if (!isLiked) {
            const data = {
                receiver: video.user._id,
                type: 'like',
                video: video,
                sender: currentUser,
            };

            socket.emit('sendNotification', data);

            if (data.receiver !== data.sender._id) {
                await notificationService.create({
                    ...data,
                    createdAt: new Date(),
                });
            }
        }
    };

    return (
        <Wrapper className="action-list">
            <li className="action-item" onClick={handleLike}>
                <span
                    className="action-item-btn"
                    style={{
                        color: isLiked && '#fe2c55',
                    }}
                >
                    <SolidHeartIcon width="2.4rem" height="2.4rem" />
                </span>
                <span className="video-stat">{configNumber(likes)}</span>
            </li>
            <li className="action-item" onClick={OnOpenCommentContent}>
                <span className="action-item-btn">
                    <CommentIcon width="2.4rem" height="2.4rem" />
                </span>
                <span className="video-stat">
                    {configNumber(video.comments.length)}
                </span>
            </li>

            <li className="action-item" onClick={onOpenShareContent}>
                <span className="action-item-btn">
                    <ShareIcon2 width="2.4rem" height="2.4rem" />
                </span>
                <span className="video-stat">
                    {configNumber(video.shares.length)}
                </span>
            </li>
        </Wrapper>
    );
}
