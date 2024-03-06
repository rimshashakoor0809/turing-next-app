// services/api.js
"use server";
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const baseURL = 'https://frontend-test-api.aircall.dev';

let refreshTimeout: NodeJS.Timeout;

const api = axios.create({
  baseURL,
});

export const setAuthToken = (token: string | undefined) => {
  console.log("Auth Token ::::: ", token)
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const calculateTokenExpiration = () => {
  const expTime = cookies().get("exp_time")?.value;
  return parseInt(expTime) - Date.now();
};

const setupTokenRefreshTimer = () => {
  clearTimeout(refreshTimeout);
  const remainingTime = calculateTokenExpiration();
  refreshTimeout = setTimeout(refreshTokenIfNeeded, remainingTime - 2 * 60 * 1000); // Refresh 2 minutes before expiration
};



const refreshTokenIfNeeded = async () => {
  console.log("Refreshing Token Again")
  try {
    const remainingTime = calculateTokenExpiration();
    if (remainingTime < 2 * 60 * 1000) { // If less than 2 minutes remaining, refresh token
      const response = await api.post('/auth/refresh-token');
      const { access_token } = response.data;
      setAuthToken(access_token);
      const newExpTime = Date.now() + 4 * 60 * 1000; // Refresh token lasts for 24 hours
      cookies().set("access_token", access_token, { expires: newExpTime, httpOnly: true });
      cookies().set("exp_time", newExpTime.toString(), { httpOnly: true });
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // Handle token refresh failure
  }
};

export const login = async (payload : {username : string, password :string}) => {
  try {
    const response = await api.post('/auth/login', payload);
    const { access_token } = response.data;
    if (!access_token) {
      return { success: false, message: "Failed to login" };
    }
    cookies().set("access_token", access_token, { expires: Date.now() + 10 * 60 * 1000, httpOnly: true })
    cookies().set("exp_time", (Date.now() + 4 * 60 * 1000).toString(), { httpOnly: true });
    setAuthToken(access_token);
    setupTokenRefreshTimer();
    // redirect("/")
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh-token');
    const { access_token } = response.data;
    setAuthToken(access_token);
    return response.data;
  } catch (error) {
    console.log("Error in login :", error?.response?.data)
    return error?.response?.data;
  }
};

export const getCalls = async (offset :number = 0 , limit:number = 10) => {
  try {
    refreshTokenIfNeeded();
    const token  = cookies().get("access_token")?.value;
    setAuthToken(token)
    const response = await api.get(`/calls?offset=${offset}&limit=${limit}`);
    console.log("response update node ::::: ", response)
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getCallWithId = async (id: string) => {
  try {
    refreshTokenIfNeeded();
    const token= cookies().get("access_token")?.value;
    setAuthToken(token)
    const response = await api.get(`/calls/${id}}`);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const updateNote= async (id : number, payload : {content :string}) => {
  try {
    refreshTokenIfNeeded();
    const token= cookies().get("access_token")?.value;
    setAuthToken(token)
    const response = await api.post(`/calls/${id}/note`, payload);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const updateStatus= async (id : string, payload : {}) => {
  try {
    refreshTokenIfNeeded();
    const token= cookies().get("access_token")?.value;
    setAuthToken(token)
    const response = await api.put(`/calls/${id}/archive`, payload);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const checkAuth = async () => {
  try {
    refreshTokenIfNeeded();
    const token = cookies().get("access_token")?.value;
    if(!token) return false
    setAuthToken(token)
    const {data} = await api.get(`/me`);
    console.log("Response USER :::::: ", data)
    if (data) {
      return true;
    }
  } catch (error) {
    console.log("Error in user: ", error)
    return false;
  }
};

export const removeCookies =  () => {
  cookies().delete("access_token")
  redirect("/")
};