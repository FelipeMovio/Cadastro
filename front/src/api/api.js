const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export async function login(email, senha) {
  const resp = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });
  if (!resp.ok) {
    throw new Error("Falha no login");
  }
  return resp.json(); // { token: "..." }
}

export async function register(userData) {
  const resp = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error(errorText || "Erro no registro");
  }
  return resp.json();
}

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getUsers() {
  const resp = await fetch(`${API_BASE}/users`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  if (!resp.ok) {
    throw new Error("Erro ao buscar usuários");
  }
  return resp.json(); // lista de users
}

export async function getUserById(id) {
  const resp = await fetch(`${API_BASE}/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  if (!resp.ok) {
    throw new Error("Erro ao buscar usuário");
  }
  return resp.json();
}

export async function deleteUser(id) {
  const resp = await fetch(`${API_BASE}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  if (!resp.ok) {
    throw new Error("Erro ao deletar usuário");
  }
  return true;
}
