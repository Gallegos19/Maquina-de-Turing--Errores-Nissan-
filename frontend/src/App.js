import React, { useState } from 'react';
import './App.css';

const errorMessages = {
  "P0100": "Medidor de masa de aire (tierra – MAF) / (volumétrico – VAF) – Fallo del circuito",
  "P0101": "Sensor de flujo de masa de aire (MAF) / sensor (VAF) – Rango / Rendimiento",
  "P0102": "Sensor del medidor de flujo de masa de aire (MAF) / (VAF) – entrada baja",
  "P0103": "Sensor de flujo de aire (MAF) / (VAF) – entrada alta",
  "P0105": "Medidor de flujo de masa de aire (MAF) / (VAF) – mal contacto del circuito",
  "P0106": "Sensor de presión absoluta del colector de admisión / Sensor de presión atmosférica – Rango / Rendimiento",
  "P0107": "Sensor de presión absoluta del colector de admisión / Sensor de presión atmosférica – Señal baja",
  "P0108": "Sensor de presión absoluta del colector de admisión / sensor de presión atmosférica – nivel de señal alto",
  "P0110": "Admisión – falla del circuito",
  "P0111": "Admisión – Rango / Rendimiento",
  "P0112": "Sensor de temperatura del aire de admisión – nivel de señal bajo",
  "P0113": "Sensor de temperatura del aire de admisión – entrada alta",
  "P0115": "Sensor de temperatura del refrigerante – circuito defectuoso",
  "P0116": "Sensor de temperatura del refrigerante – Rango / rendimiento",
  "P0117": "Sensor de temperatura del refrigerante – nivel de señal bajo",
  "P0118": "Sensor de temperatura del refrigerante – entrada alta",
  "P0120": "Sensor A de posición del acelerador / Sensor A de posición del pedal del acelerador – Mal funcionamiento del circuito",
  "P0121": "Sensor de posición del acelerador A / Sensor de posición del pedal del acelerador A – Rango / rendimiento",
  "P0122": "Sensor de posición del acelerador «A» / Sensor de posición del pedal del acelerador «A» – nivel de señal bajo",
  "P0123": "Sensor de posición del acelerador A / Sensor de posición del pedal del acelerador A – nivel de señal alto",
  "P0125": "La temperatura del refrigerante es insuficiente para el control de combustible de circuito cerrado",
  "P0130": "Sensor de oxígeno 1, Banco 1 – circuito defectuoso",
  "P0131": "Sensor de oxígeno 1, Banco 1 – Bajo voltaje",
  "P0132": "Sensor de oxígeno 1, Banco 1 – Alto voltaje",
  "P0133": "Sensor de oxígeno 1, Banco 1 – Respuesta lenta",
  "P0134": "Sensor de oxígeno 1, Banco 1 – Sin respuesta",
  "P0135": "Mal funcionamiento del circuito de control de calefacción del banco 1 del sensor de oxígeno calentado 1",
  "P0136": "Sensor de oxígeno 2, Banco 1 – circuito defectuoso",
  "P0137": "Sensor de oxígeno 2, Banco 1 – Bajo voltaje",
  "P0138": "Sensor de oxígeno 2, Banco 1 – Alto voltaje",
  "P0139": "Sensor de oxígeno 2, Banco 1 – Respuesta lenta",
  "P0140": "Sensor de oxígeno 2, banco 1 – sin respuesta",
  "P0141": "Fallo en el circuito de control del calentador del banco 1 del sensor de oxígeno calentado 2",
  "P0142": "Sensor de oxígeno calentado 3, Banco 1 – Mal funcionamiento del circuito",
  "P0143": "Sensor de oxígeno 3, Banco 1 – Bajo voltaje",
  "P0144": "Sensor de oxígeno 3, Banco 1 – Alto voltaje",
  "P0145": "Sensor de oxígeno 3, Banco 1 – Respuesta lenta",
  "P0146": "Sensor de oxígeno 3, banco 1 – sin respuesta",
  "P0147": "Fallo en el circuito de control del calentador del banco 1 del sensor de oxígeno calentado 3",
  "P0150": "Sensor de oxígeno 1, Banco 2 – Mal funcionamiento del circuito",
  "P0151": "Sensor de oxígeno 1, Banco 2 – Bajo voltaje",
  "P0152": "Sensor de oxígeno 1, Banco 2 – Alto voltaje",
  "P0153": "Sensor de oxígeno 1, Banco 2 – Respuesta lenta",
  "P0154": "Sensor de oxígeno 1, Banco 2 – Sin respuesta",
  "P0155": "Sensor de oxígeno 1, Banco 2, Control del calentador – Mal funcionamiento del circuito",
  "P0156": "Sensor de oxígeno 2, Banco 2 – circuito defectuoso",
  "P0157": "Sensor de oxígeno 2, Banco 2 – Bajo voltaje",
  "P0158": "Sensor de oxígeno 2, Banco 2 – Alto voltaje",
  "P0159": "Sensor de oxígeno 2, Banco 2 – Respuesta lenta",
  "P0160": "Sensor de oxígeno 2, Banco 2 – Sin respuesta",
  "P0161": "Fallo en el circuito de control del calentador del banco 2 del sensor de oxígeno calentado 2",
  "P0162": "Sensor de oxígeno 3, banco 2 – circuito defectuoso",
  "P0163": "Sensor de oxígeno 3, Banco 2 – Bajo voltaje",
  "P0164": "Sensor de oxígeno 3, Banco 2 – Alto voltaje",
  "P0165": "Sensor de oxígeno 3, Banco 2 – Respuesta lenta",
  "P0166": "Sensor de oxígeno 3, Banco 2 – Sin respuesta",
  "P0167": "Fallo en el circuito de control del calentador del banco 2 del sensor de oxígeno calentado 3",
  "P0171": "Para relación aire pobre – combustible, Banco 1",
  "P0172": "Mezcla de aire y combustible demasiado rica, Banco 1",
  "P0173": "Balance de combustible, Banco 2 – Mal funcionamiento",
  "P0174": "Para relación aire pobre – combustible, Banco 2",
  "P0175": "Mezcla de aire y combustible demasiado rica, Banco 2",
  "P0176": "Sensor de relación de mezcla – falla del circuito",
  "P0177": "Sensor de relación de mezcla – Rango / potencia",
  "P0178": "Sensor de relación de mezcla – nivel de señal bajo",
  "P0179": "Sensor de relación de mezcla – nivel de señal alto",
  "P0180": "Sensor de temperatura del combustible A – circuito defectuoso"
};


function App() {
  const [errorCode, setErrorCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  
  const handleCheckError = async () => {
    setLoading(true);
    setErrorMessage(''); 
    try {
      const response = await fetch(`http://localhost:5000/check-error`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: errorCode }),
      });

      const data = await response.json();

      if (data.result) {
        const message = errorMessages[errorCode] || "Código de error desconocido pero aceptado.";
        setErrorMessage(message);
      } else {
        setErrorMessage('Código de error no admitido.');
      }
    } catch (error) {
      setErrorMessage('Hubo un problema con la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Validador de Códigos de Error Nissan</h1>
        <p>Ingrese el código de error para verificar:</p>

        <input
          type="text"
          placeholder="Ejemplo: P0133"
          value={errorCode}
          onChange={(e) => setErrorCode(e.target.value)}
        />
        <button onClick={handleCheckError} disabled={loading || !errorCode}>
          {loading ? 'Verificando...' : 'Verificar Código'}
        </button>

        {errorMessage && (
          <p className="error-message">
            {errorMessage}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
