import React, { useState } from "react";
import './index';

function App() {
  const [form, setForm] = useState({
    sexo: "",
    idade: "",
    peso: "",
    altura: "",
    atividade: "",
    objetivo: "",
  });

  const handleClear = () => {
    setForm({
      sexo: "",
      idade: "",
      peso: "",
      altura: "",
      atividade: "",
      objetivo: "",
    });
    setResultado(null);
    setToastMessage("");
  };

  const [resultado, setResultado] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { sexo, idade, peso, altura, atividade, objetivo } = form;

    const camposVazios = [];

    if (!sexo) camposVazios.push("Sexo");
    if (!idade) camposVazios.push("Idade");
    if (!peso) camposVazios.push("Peso");
    if (!altura) camposVazios.push("Altura");
    if (!atividade) camposVazios.push("Atividade");
    if (!objetivo) camposVazios.push("Objetivo");

    if (camposVazios.length > 0) {
      setToastMessage(`Preencha: ${camposVazios.join(", ")}`);
      setTimeout(() => setToastMessage(""), 4000);
      return;
    }

    const tmb =
      sexo === "masculino"
        ? 10 * peso + 6.25 * altura - 5 * idade + 5
        : 10 * peso + 6.25 * altura - 5 * idade - 161;

    const fator = {
      leve: 1.375,
      moderada: 1.55,
      intensa: 1.725,
    }[atividade] || 1.2;

    let calorias = tmb * fator;
    if (objetivo === "emagrecer") calorias *= 0.8;
    if (objetivo === "ganhar") calorias *= 1.15;

    const proteinas = peso * 2;
    const gorduras = peso * 1;
    const kcalProteina = proteinas * 4;
    const kcalGordura = gorduras * 9;
    const carboidratos = (calorias - (kcalProteina + kcalGordura)) / 4;

    setResultado({
      calorias: Math.round(calorias),
      proteinas: Math.round(proteinas),
      gorduras: Math.round(gorduras),
      carboidratos: Math.round(carboidratos),
    });
  };

  return (
    <div className="container">
      <h1>Macros<span className="span-title">Fácil</span></h1>

      {toastMessage && (
        <div className="toast">
          {toastMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Sexo:
          <select name="sexo" value={form.sexo} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </label>

        <label>Idade:
          <input type="number" name="idade" value={form.idade} onChange={handleChange} />
        </label>

        <label>Peso (kg):
          <input type="number" name="peso" value={form.peso} onChange={handleChange} />
        </label>

        <label>Altura (cm):
          <input type="number" name="altura" value={form.altura} onChange={handleChange} />
        </label>

        <label>Atividade:
          <select name="atividade" value={form.atividade} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="leve">Leve</option>
            <option value="moderada">Moderada</option>
            <option value="intensa">Intensa</option>
          </select>
        </label>

        <label>Objetivo:
          <select name="objetivo" value={form.objetivo} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="emagrecer">Emagrecer</option>
            <option value="manter">Manter</option>
            <option value="ganhar">Ganhar massa</option>
          </select>
        </label>

        <div className="button-group">
          <button type="submit">Calcular</button>
          <button type="button" onClick={handleClear}>Limpar</button>
        </div>
      </form>

      {resultado && (
        <div className="resultado">
          <h3>Resultado:</h3>
          <h3>Consumo diário:</h3>
          <p><strong>Calorias:</strong> {resultado.calorias} kcal</p>
          <p><strong>🥩 Proteínas:</strong> {resultado.proteinas} g</p>
          <p><strong>🥓 Gorduras:</strong> {resultado.gorduras} g</p>
          <p><strong>🍙 Carboidratos:</strong> {resultado.carboidratos} g</p>
        </div>
      )}
    </div>
  );
}

export default App;
