import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as videoService from '~/services/videoService'

const videosSlice = createSlice({
    name: 'videos',
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        videos: [],
    },
    reducers: {
        addVideo: (state, action) => {
            state.videos.push(action.payload)
        },
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.videos = []
        },
        resetStatus: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVideos.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                state.videos = action.payload
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
            })
            .addCase(getVideos.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.videos = null
            })
            .addCase(createVideo.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(createVideo.fulfilled, (state, action) => {
                state.videos.push(action.payload)
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
            })
            .addCase(createVideo.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
            })
            .addCase(updateVideo.fulfilled, (state, action) => {
                const videoIndex = state.videos.findIndex(
                    (video) => video._id === action.payload._id
                )
                state.videos[videoIndex] = action.payload
            })
            .addCase(deleteVideo.fulfilled, (state, action) => {
                state.videos = state.videos.filter(
                    (video) => video._id !== action.payload
                )
            })
            .addCase(likeVideo.fulfilled, (state, action) => {
                const newVideos = state.videos.map((video) => {
                    return video._id === action.payload._id
                        ? { ...video, likes: action.payload.likes }
                        : video
                })
                state.videos = newVideos
            })
    },
})

export const getVideos = createAsyncThunk('videosList/getVideos', async () => {
    const videos = await videoService.getVideos()
    return videos
})

export const createVideo = createAsyncThunk(
    'videoList/createVideo',
    async (videoData) => {
        const newVideo = await videoService.create(videoData)
        return newVideo
    }
)

export const likeVideo = createAsyncThunk('videoList/like', async (videoID) => {
    const newVideo = await videoService.like(videoID)
    return newVideo
})

export const updateVideo = createAsyncThunk(
    'videoList/updateVideo',
    async (updatedVideo) => {
        const newVideo = await videoService.update(updatedVideo)
        return newVideo
    }
)

export const deleteVideo = createAsyncThunk(
    'videoList/deleteVideo',
    async (videoID) => {
        const deletedVideoID = await videoService.remove(videoID)
        return deletedVideoID
    },
    {}
)

export default videosSlice
