import axios from 'axios';

export const uploadPic = async (media: any) => {
  try {
    const form = new FormData();
    form.append('file', media);
    form.append('upload_preset', 'social_media');
    form.append('cloud_name', 'dnqoeal8o');

    const { data } = await axios.post(process.env.CLOUDINARY_URL, form, {
      withCredentials: false,
    });
    return data.url;
  } catch (error) {
    return;
  }
};
