const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

async function uploadAvatar() {
  const url = "http://192.168.100.51:5000/api/users/update/avatar"; // Ganti dengan URL yang sesuai
  const filePath = path.join(__dirname, "assets", "test.jpg"); // Ganti dengan path file yang sesuai

  // Cek apakah file ada
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return;
  }

  // Buat FormData
  const form = new FormData();
  form.append("avatar", fs.createReadStream(filePath));

  try {
    const response = await axios.put(url, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    console.log("Status:", response.status);
    console.log("Response:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Response:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
}

uploadAvatar();
