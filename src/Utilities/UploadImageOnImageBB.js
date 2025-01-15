import axios from "axios";

export const imageUploadToImageBB = async(imageFile) =>{
    const imageData = new FormData();
        imageData.append('image', imageFile);

        try {
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImageBB_API_Key}`, imageData);
            const photoURL = data.data.display_url;

            return photoURL;
        }
        catch (err) {
            console.log(err);
        }
}