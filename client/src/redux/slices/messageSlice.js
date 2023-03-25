import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as messageService from '~/services/messageService'

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        messages: [],
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        createMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.messages = []
        },
        resetStatus: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.messages = null
            })

            .addCase(createMessage.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload)
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
            })
            .addCase(updateMessage.fulfilled, (state, action) => {
                const messageIndex = state.messages.findIndex(
                    (message) => message._id === action.payload._id
                )
                state.messages[messageIndex] = action.payload
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.messages = state.messages.filter(
                    (message) => message._id !== action.payload
                )
            })
            .addCase(likeMessage.fulfilled, (state, action) => {
                const newMessages = state.messages.map((message) => {
                    return message._id === action.payload._id
                        ? { ...message, likes: action.payload.likes }
                        : message
                })
                state.messages = newMessages
            })
    },
})

export const getMessages = createAsyncThunk(
    'messageList/getMessages',
    async () => {
        const messages = await messageService.getAll()
        return messages
    }
)

export const createMessage = createAsyncThunk(
    'messageList/createMessage',
    async (videoData, { getState }) => {
        const newMessage = await messageService.create(videoData)
        const { users } = getState().users

        const message = {
            ...newMessage,
            sender: users.find((user) => user._id === newMessage.sender),
        }
        return message
    }
)

export const likeMessage = createAsyncThunk(
    'messageList/like',
    async (messageId) => {
        const newMessage = await messageService.like(messageId)
        return newMessage
    }
)

export const updateMessage = createAsyncThunk(
    'messageList/updateMessage',
    async (updatedVideo) => {
        const newMessage = await messageService.update(updatedVideo)
        return newMessage
    }
)

export const deleteMessage = createAsyncThunk(
    'messageList/deleteMessage',
    async (messageId) => {
        const deletedMessageId = await messageService.remove(messageId)
        return deletedMessageId
    },
    {}
)

export default messageSlice
