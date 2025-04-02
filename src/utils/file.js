import { v2 as cloudinary } from "cloudinary"

async function uploadfile(fileS) {
  const resultList = []

  for (const file of fileS) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader
        .upload_stream(
          {
            folder: "Nodejs"
          },
          (error, data) => {
            if (error) return reject(error)
            resolve(data)
          });
      stream.end(file.buffer);
    }
    );
    console.log(result)

    resultList.push(result)
  }
  return resultList
}


export default uploadfile;