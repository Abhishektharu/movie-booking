const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const backend_url = import.meta.env.VITE_API_BASE_URL;
const getImageUrl = (path)=>{
    return `${API_BASE_URL}${path}`;
}

const getBackend = (path)=>{
    return `${backend_url}${path}`;
}

const showDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = formattedDate.getDate().toString().padStart(2, '0'); // Pad single digits with 0
    return `${year}-${month}-${day}`; // Format as "YYYY-MM-DD"
  }
export {getImageUrl, getBackend, showDate} 