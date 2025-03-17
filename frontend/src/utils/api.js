const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getImageUrl = (path)=>{
    return `${API_BASE_URL}${path}`;
}

export {getImageUrl} 