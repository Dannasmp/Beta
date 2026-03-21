const CLOUD_NAME = "TU_CLOUD_NAME";
const UPLOAD_PRESET = "TU_UPLOAD_PRESET";

export const uploadImage = async (image) => {
    const data = new FormData();

    data.append('file', {
        uri: image.uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
    });

    data.append('upload_preset', UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data,
    });

    const result = await res.json();

    return result.secure_url; // 🔥 URL FINAL
};