import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as userService from '~/services/userService'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        users: [],
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const currentUserIndex = state.users.findIndex(
                    (user) => user._id === action.payload.id
                )
                state.users[currentUserIndex] = action.payload
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    (user) => user._id !== action.payload
                )
            })
            .addCase(followUser.fulfilled, (state, action) => {
                const { currentUserID, followedUserID } = action.payload

                const newUsers = state.users.map((user) => {
                    return user._id === currentUserID
                        ? {
                              ...user,
                              followings:
                                  user.followings.concat(followedUserID),
                          }
                        : user._id === followedUserID
                        ? {
                              ...user,
                              followers: user.followers.concat(currentUserID),
                          }
                        : user
                })

                state.users = newUsers
            })
            .addCase(unfollowUser.fulfilled, (state, action) => {
                const { currentUserID, unfollowedUserID } = action.payload

                const newUsers = state.users.map((user) => {
                    return user._id === currentUserID
                        ? {
                              ...user,
                              followings: user.followings.filter(
                                  (_id) => _id !== unfollowedUserID
                              ),
                          }
                        : user._id === unfollowedUserID
                        ? {
                              ...user,
                              followers: user.followers.filter(
                                  (_id) => _id !== currentUserID
                              ),
                          }
                        : user
                })
                state.users = newUsers
            })
    },
})

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const data = await userService.getUsers()
    return data
})

export const updateUser = createAsyncThunk(
    'userList/updateUser',
    async ({ _id, formData }, thunkAPI) => {
        const data = await userService.update(_id, formData)
        return data
    }
)

export const deleteUser = createAsyncThunk(
    'userList/deleteUser',
    async (userID) => {
        const data = await userService.remove(userID)
        return data
    }
)

export const followUser = createAsyncThunk(
    'userList/followUser',
    async (userID) => {
        const data = await userService.follow(userID)
        return data
    }
)

export const unfollowUser = createAsyncThunk(
    'userList/unfollowUser',
    async (userID) => {
        const data = await userService.unfollow(userID)
        return data
    }
)

export default usersSlice
