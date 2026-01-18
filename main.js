async function identify() {
  const fileInput = document.getElementById("photo");
  const result = document.getElementById("result");
  const file = fileInput.files[0];

  if (!file) {
    result.textContent = "Subí una foto primero 🐦";
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  result.textContent = "Identificando ave... ⏳";

  try {
    const res = await fetch("/identify-bird", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      result.textContent = "Error al identificar el ave ❌";
      return;
    }

    const json = await res.json();
    result.textContent =
      json.choices?.[0]?.message?.content ||
      "No se pudo identificar el ave";

  } catch {
    result.textContent = "Error de conexión ⚠️";
  }
}
