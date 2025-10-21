import { useContext, useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [erro, setErro] = useState(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setErro(err.message || "Erro ao buscar usuários");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que quer deletar esse usuário?")) {
      return;
    }
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      alert("Erro ao deletar: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Lista de Usuários</h2>
      <button onClick={logout}>Logout</button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              {user.nome} ({user.email})
            </Link>{" "}
            <button onClick={() => handleDelete(user.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
