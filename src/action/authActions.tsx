import { API_URL } from "@/lib/constantes";

export const login = async (data: LOGIN) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const responseData = await response.json();

    return {
      status: response.status,
      data: responseData,
      ok: response.ok,
    };
  } catch (error) {
    console.log("Login error", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include", // important pour envoyer le cookie
    });

    const data = await response.json();
    return { status: response.status, data, ok: response.ok };
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

