const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const backend_url = import.meta.env.VITE_API_BASE_URL;
const getImageUrl = (path)=>{
    return `${API_BASE_URL}${path}`;
}

const getBackend = (path)=>{
    return `${backend_url}${path}`;
}
export {getImageUrl, getBackend} 