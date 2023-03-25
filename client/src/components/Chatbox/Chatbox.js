import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from '~/components/Avatar'
import Button from '~/components/Button'
import {
    CheckedIcon,
    EmojiIcon,
    LeftArrowIcon2,
    SolidMessageIcon,
} from '~/components/Icons'
import Message from '~/components/Message'
import { appSelector, authSelector } from '~/redux/selectors'
import appSlice from '~/redux/slices/appSlice'
import { Wrapper } from './styled'
import { createMessage, deleteMessage } from '~/redux/slices/messageSlice'

export default function Chatbox({ messages, selectedConversation }) {
    const messageRef = useRef()
    const messageList = useRef()
    const [message, setMessage] = useState('')
    const [conversationMessages, setConversationMessages] = useState([])
    const { currentUser } = useSelector(authSelector)
    const { socket } = useSelector(appSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if (messages.length > 0) {
            setConversationMessages(
                messages.filter(
                    (m) => m.conversation === selectedConversation?._id
                )
            )
        }
    }, [messages, selectedConversation?._id])

    useEffect(() => {
        messageList.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        })
    }, [conversationMessages])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const receiver = selectedConversation?.members.find(
            (member) => member._id !== currentUser._id
        )

        const newMessage = await dispatch(
            createMessage({
                receiver: receiver._id,
                text: message,
                conversation: selectedConversation._id,
            })
        ).unwrap()

        setMessage('')

        socket?.emit('sendMessage', {
            ...newMessage,
            receiver: receiver._id,
        })
    }

    const handleDelete = async (id) => {
        dispatch(deleteMessage(id))
    }

    const receiver = selectedConversation?.members.find(
        (member) => member._id !== currentUser?._id
    )

    if (!selectedConversation || !currentUser) return

    return (
        <Wrapper>
            <div className="chatbox-header">
                <Avatar
                    src={receiver?.avatar}
                    width="5.6rem"
                    height="5.6rem"
                    alt="Avatar"
                    to={`/@${receiver?.username}`}
                    className="avatar"
                />
                <Link to={`/@${receiver?.username}`}>
                    <div className="chat-user-info">
                        <h4 className="chat-user__name">
                            {receiver?.full_name}
                            {receiver?.tick && (
                                <span className="check icon-wrapper">
                                    <CheckedIcon
                                        width="1.4rem"
                                        height="1.4rem"
                                    />
                                </span>
                            )}
                        </h4>
                        <p className="chat-user__username">{`@${receiver?.username}`}</p>
                        <p className="chat-user_subinfo">
                            <span className="following-count">
                                {currentUser.followings?.length} đang follow
                            </span>
                            <span className="separate"></span>
                            <span className="follower-count">
                                {currentUser.followers?.length} follower
                            </span>
                        </p>
                    </div>
                </Link>
            </div>

            <div className="message-list-wrapper">
                <ul className="message-list" ref={messageList}>
                    {conversationMessages.map((message) => {
                        return (
                            <Message
                                key={message._id}
                                message={message}
                                onDelete={handleDelete}
                                currentUser={currentUser}
                            />
                        )
                    })}
                </ul>
            </div>
            <div className="chatbox-bottom">
                <form className="add-message-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            ref={messageRef}
                            type="text"
                            placeholder="Send a message..."
                            className="form-control"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <span className="emoji-button icon-wrapper">
                            <EmojiIcon width="2.4rem" height="2.4rem" />
                        </span>
                    </div>
                    {message && (
                        <Button type="submit" className="post-message-btn">
                            <SolidMessageIcon width="3.2rem" height="3.2rem" />
                        </Button>
                    )}
                </form>
            </div>
            <div
                className="chatbox-back-icon icon-wrapper"
                onClick={() => {
                    dispatch(appSlice.actions.setSelectedConversationID(null))
                }}
            >
                <LeftArrowIcon2 />
            </div>
        </Wrapper>
    )
}
