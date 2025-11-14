export const uploadImage  = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image, image.name);
  const resp = await fetch("https://dataset.uz/api/files/upload", {
    method: "POST",
    body: formData,
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Upload failed: ${resp.status} ${txt}`);
  }

  return resp.json();
};