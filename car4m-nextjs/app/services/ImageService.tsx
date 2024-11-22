import axios from "./api";


const uploadToCloudinary = (file: File) => {
    const body = new FormData();
    body.append('file', file);
    return axios.post('/api/v1/images/', body)
}


export { uploadToCloudinary }