import { createClient } from "@supabase/supabase-js";

const url = "https://kuieyzgnzuxwutbpsfzb.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aWV5emduenV4d3V0YnBzZnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMjIzNzYsImV4cCI6MjA3MjY5ODM3Nn0.q4pVuPQ8ZnM5hgVAR9OPTh_gtuX3oBIk2n84OL0Bmo8";

const supabase = createClient(url, key);

export default function mediaUpload(file) {
  const mediaUploadPromise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected!");
    }
    const timestamp = new Date().getTime();
    const newName = timestamp+file.name
    supabase.storage
      .from("images")
      .upload(newName, file, {
        upsert: false,
        cacheControl: "3600",
      })
      .then(() => {
        const publicUrl = supabase.storage
          .from("images")
          .getPublicUrl(newName).data.publicUrl;
        resolve(publicUrl)
      })
      .catch(() => {
        reject("Error!")
      });
  });

  return mediaUploadPromise;
}

