import { useState, useContext } from "react";
import { login as apiLogin } from "../api/api";
import { AuthContext } from "../context/AuthContext";

import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiLogin(email, senha);
      login(data.token);
    } catch (err) {
      setErro(err.message || "Erro no login");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {erro && <p className="error">{erro}</p>}

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit">Entrar</button>
      </form>

      {/* Link para registro */}
      <p style={{ marginTop: "1rem" }}>
        Ainda não tem uma conta?{" "}
        <Link to="/register">
          <button style={{ marginTop: "0.5rem" }}>Criar Conta</button>
        </Link>
      </p>
    </div>
  );
}
