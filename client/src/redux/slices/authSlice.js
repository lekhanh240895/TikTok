import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "~/services/authService";
import * as userService from "~/services/userService";
import { auth } from "~/firebase/config";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isLoading: false,
    isSuccess: false,
    error: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
        state.currentUser = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.currentUser = null;
        const response = action.payload.response.data;
        const responseMessage = response.message;
        state.error = responseMessage;
      })
      .addCase(loginWithApp.pending, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
        state.currentUser = action.payload;
      })
      .addCase(loginWithApp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
        state.currentUser = action.payload;
      })
      .addCase(loginWithApp.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const errorMessage = action.payload.code
          .split("auth/")[1]
          .replaceAll("-", " ");
        state.error =
          errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.currentUser = null;
        const response = action.payload.response.data;
        const responseMessage = response.message;
        state.error = responseMessage;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        const response = action.payload.response.data;
        const responseMessage = response.message;
        state.error = responseMessage;
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.currentUser = null;
        state.error = action.payload;
      });
  },
});

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const user = await authService.login(data);
      return user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Login
export const loginWithApp = createAsyncThunk(
  "auth/loginWithApp",
  async (type, { dispatch, rejectWithValue, getState }) => {
    try {
      let result;

      if (type === "facebook") {
        const fbProvider = new FacebookAuthProvider();
        fbProvider.addScope("user_birthday");
        fbProvider.setCustomParameters({
          display: "popup", //Login dưới dạng popup
        });
        result = await signInWithPopup(auth, fbProvider);
      }

      if (type === "google") {
        const ggProvider = new GoogleAuthProvider();
        ggProvider.addScope(
          "https://www.googleapis.com/auth/contacts.readonly"
        );
        ggProvider.setCustomParameters({
          login_hint: "user@example.com",
        });
        result = await signInWithPopup(auth, ggProvider);
      }

      const {
        displayName: username,
        email,
        firstName: first_name,
        lastName: last_name,
        fullName: full_name,
        photoUrl: avatar,
        localId: password,
      } = result._tokenResponse;

      const { users } = getState().users;

      console.log(users.some((user) => user.email === email));

      if (users.some((user) => user.email === email)) {
        const user = dispatch(
          login({
            username,
            email,
            first_name,
            last_name,
            full_name,
            avatar,

            password,
          })
        ).unwrap();

        return user;
      } else {
        const user = dispatch(
          register({
            username,
            email,
            first_name,
            last_name,
            full_name,
            avatar,
            password,
          })
        ).unwrap();

        return user;
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const user = await authService.register(data);
      return user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// JWT Login
export const getMe = createAsyncThunk("auth/getMe", async () => {
  const user = await authService.getMe();
  return user;
});

export const update = createAsyncThunk(
  "auth/update",
  async ({ _id, formData }, { rejectWithValue }) => {
    try {
      const data = await userService.update(_id, formData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export default authSlice;
