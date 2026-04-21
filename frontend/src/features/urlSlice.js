import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = axios.create({baseURL:"http://localhost:5000/api/url"});
export const shortenUrl=createAsyncThunk("url/shortenUrl",
    async(longUrl)=>{
        const {data}=await API.post("/shorten",{longUrl});
        return data;
    });
export const getOriginalUrl=createAsyncThunk("url/getOriginalUrl",
    async(code)=>{
        const {data}=await API.get(`/${code}`);
        console.log(data)
        return data;
    });
export const updateUrl = createAsyncThunk("url/updateUrl",
    async({shortCode,longUrl})=>{
        const {data} = await API.put(`/${shortCode}`,{longUrl});
        return data;
    });
export const deleteUrl=createAsyncThunk("url/deleteUrl",
    async({shortCode})=>{
        await API.delete(`/{shortCode}`);
        return `Deleted Successfully :${shortCode}`;
    });
export  const getStats = createAsyncThunk("ur;/getStats",async (shortCode)=>{
    const {data} = await API.get(`/shorten/${shortCode}/stats`);
    return data;
})

const urlSlice = createSlice({
    name:"url",
    initialState:{
        shortUrl:"",
        urlDetails:"",
        updatedUrl:"",
        deleteMessage:" ",
        loading:false,
        error:null,
        stats:null
    },reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(shortenUrl.fulfilled,(state,action)=>{
            state.shortUrl =action.payload.shortUrl;
            state.loading=false;
        })
        .addCase(getOriginalUrl.fulfilled,(state,action)=>{
           state.urlDetails=action.payload;
            state.loading=false;
        })
        .addCase(updateUrl.fulfilled,(state,action)=>{
            state.updatedUrl=action.payload
            state.loading=false;
        })
        .addCase(deleteUrl.fulfilled,(state,action)=>{
     state.urlDetails = null; // clear the details
  state.deleteMessage = `URL with code ${action.payload} deleted successfully.`;
  state.loading = false;
        })
        .addCase(getStats.fulfilled,(state,action)=>{
            state.stats=action.payload
            state.loading=false;
        })
        .addMatcher((action)=>action.type.endsWith("/pending"),(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addMatcher((action)=>action.type.endsWith("/rejected"),(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})
export const urlReducer = urlSlice.reducer