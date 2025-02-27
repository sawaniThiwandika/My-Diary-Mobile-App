import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../model/UserModel";
import { api } from "../../service/api-services";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Add AsyncStorage import

const initialState = {
    jwt_token: null,
    refresh_token: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: ""
}

export const register = createAsyncThunk(
    "userSlice/register",
    async (user: User) => {
        try {
            const response = await api.post("/auth/register", { user }, { withCredentials: true });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const login = createAsyncThunk(
    "userSlice/login",
    async (user: User, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", { user }, { withCredentials: true });
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed";
            return rejectWithValue(errorMessage);
        }
    }
);

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        addUser: (state, action) => {

        },
        updateUser: (state, action) => {

        },
        deleteUser: (state, action) => {

        },
        logout: (state) => {
            state.jwt_token = null;
            state.refresh_token = null;
            state.username = null;
            state.isAuthenticated = false;
            AsyncStorage.clear();
        }
    },
    extraReducers(builder) {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                console.log("User Registered Successfully");
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;
            })
            .addCase(login.fulfilled, (state, action: any) => {
                state.jwt_token = action.payload.accessToken;
                state.refresh_token = action.payload.refreshToken;
                state.username = action.payload.username;
                state.isAuthenticated = true;
                AsyncStorage.setItem("jwt_token", action.payload.accessToken);
                AsyncStorage.setItem("refresh_token", action.payload.refreshToken);
                AsyncStorage.setItem("username", action.payload.username);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            });
    }
});

export const { addUser, updateUser, deleteUser, logout } = userSlice.actions;
export default userSlice.reducer;
