import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// This is the function that will be called to get the data from the server
// It will send the token to the server to help the middleware to identify the user
API.interceptors.request.use((req) => {
    const userToken = localStorage.getItem('profile');
    if (userToken) {
        req.headers.Authorization = `Bearer ${JSON.parse(userToken).token}`;
    }
    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);