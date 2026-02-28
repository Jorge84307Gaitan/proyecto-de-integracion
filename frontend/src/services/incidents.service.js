import { api, authHeaders } from "./api";

export async function listIncidents() {
  const { data } = await api.get("/incidents");
  return data;
}

export async function createIncident({ token, tipo, descripcion, imageFile }) {
  const formData = new FormData();
  formData.append("tipo", tipo);
  formData.append("descripcion", descripcion);
  if (imageFile) {
    formData.append("image", imageFile);
  }

  const { data } = await api.post("/incidents", formData, {
    ...authHeaders(token),
    headers: {
      ...authHeaders(token).headers,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
