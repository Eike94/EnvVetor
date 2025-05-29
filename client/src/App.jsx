import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("message", form.message);
    data.append("image", file);

    await axios.post("https://envvetor.onrender.com/api/form", data);
    alert("Enviado com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-title">
        <h1>SnapForm</h1>
        <p>Preencha os campos abaixo para entrar em contato conosco.</p>
      </div>
      <input
        type="text"
        placeholder="Nome"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <textarea
        placeholder="Mensagem"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <div className="file-input-wrapper">
  <label htmlFor="file-upload" className="custom-file-upload">
    {file ? file.name : "Selecionar imagem"}
  </label>
  <input
    id="file-upload"
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
    required
  />
</div>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default App;
