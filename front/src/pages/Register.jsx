import { useState } from "react";
import { register as apiRegister } from "../api/api";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import "../styles/Acess.css";

export default function Register() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    try {
      await apiRegister({ nome, idade: parseInt(idade), email, senha });
      setSucesso("Registrado com sucesso!");

      // Aguarda 1 segundos e redireciona
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setErro(err.message || "Erro no registro");
    }
  };

  return (
    <div className="container">
      <DarkModeToggle />
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        {erro && <p className="error">{erro}</p>}
        {sucesso && <p className="success">{sucesso}</p>}

        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Idade:</label>
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
