import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dyhfwq81d",
  api_key: "396318188844178",
  api_secret: "j6YrAYFTPbV22H-CgZc4UaBUu3o",
});


export const uploadUser = async (image) => {
  return cloudinary.uploader.upload(image,{
    format:"png"
  }, (err, result) => {
    if (!err){
      return result;
    } else {
      console.log(err);
    }
  })
};
