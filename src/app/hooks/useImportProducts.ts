export const importProducts = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  
  
  const resp = await fetch("https://dataset.uz/api/files/import", {
    method: "POST",
    headers: {
      "token": "SUPER_SECRET",
    },
    body: formData,
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Import failed: ${resp.status} ${txt}`);
  }
};

