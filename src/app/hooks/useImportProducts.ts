export const importProducts = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  
  const STORAGE_KEY = "device-id";
  const deviceId = localStorage.getItem(STORAGE_KEY);
  
  const resp = await fetch("https://dataset.uz/api/products/import", {
    method: "POST",
    headers: {
      "X-Device-Id": deviceId || "",
    },
    body: formData,
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Import failed: ${resp.status} ${txt}`);
  }

  return resp.json();
};

