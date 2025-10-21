import { useState, useEffect } from "react";
import { getUserById } from "../api/api";
import { useParams, Link } from "react-router-dom";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getUserById(id);
      setUser(data);
    } catch (err) {
      setErro(err.message || "Erro ao buscar usuário");
    }
  };

  if (erro) {
    return (
      <div>
        <p style={{ color: "red" }}>{erro}</p>
        <Link to="/users">Voltar</Link>
      </div>
    );
  }

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>Usuário #{user.id}</h2>
      <p>
        <strong>Nome:</strong> {user.nome}
      </p>
      <p>
        <strong>Idade:</strong> {user.idade}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <Link to="/users">Voltar à lista</Link>
    </div>
  );
}
