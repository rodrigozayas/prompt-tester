# 🧪 Prompt Tester

Proyecto genérico en JavaScript para probar prompts con parámetros y múltiples proveedores LLM. Inicialmente está integrado con **Azure OpenAI**, pero su estructura modular permite añadir más proveedores fácilmente.

---

## 🚀 Cómo funciona

1. Lee entradas desde un archivo `input.json`.
2. Cada entrada tiene:
   - Proveedor (`azure`, etc.)
   - Lista de parámetros
   - Plantilla de prompt (`promptTemplate`)
   - Resultado esperado (opcional)
3. El sistema genera el prompt reemplazando `{p1}`, `{p2}`, etc.
4. Envía la petición al proveedor correspondiente.
5. Genera un HTML visual con resultados y cálculo de **accuracy** (si se define el resultado esperado).

---

## 📦 Requisitos

- Node.js v18 o superior
- Conexión a Azure OpenAI (u otro proveedor en el futuro)
- Archivo `.env` con claves de acceso

---

## 🛠️ Instalación

```bash
git clone https://github.com/rodrigozayas/prompt-tester.git
cd prompt-tester
npm install
```
## 🧾 Configuración

### 1. Crear `.env` en la raíz

```env
AZURE_ENDPOINT=URL
AZURE_API_KEY=API KEY
AZURE_DEPLOYMENT=DEPLOYMENT
```

### 2. Crear `input.json`

Archivo en la raíz con ejemplos:

```json
[
  {
    "provider": "azure",
    "parameters": ["Gallego", "Martes"],
    "promptTemplate": "¿Qué pasa en {p1} los días {p2}?",
    "expected": "En Galicia, los martes suele llover."
  },
  {
    "provider": "azure",
    "parameters": ["Madrid", "Verano"],
    "promptTemplate": "¿Cómo es el clima en {p1} durante el {p2}?",
    "expected": "En verano, Madrid es muy caluroso."
  }
]
```

---

## ▶️ Uso

```bash
npm run start
```

Esto generará un archivo en:

```
output/results.html
```

Incluye:
- Parámetros: `{Gallego}, {Martes}`
- Prompt construido
- Respuesta generada
- Resultado esperado
- Comparación ✅ / ❌
- Accuracy total

---

## 📂 Estructura del proyecto

```
prompt-tester/
├── src/
│   ├── core/             # Lógica: lectura, ejecución, evaluación
│   ├── config/           # Manejador de proveedores
│   ├── providers/        # Azure OpenAI (otros en futuro)
│   ├── utils/            # HTML, paths, etc.
│   └── index.js          # Punto de entrada
├── templates/
│   └── resultTemplate.html  # HTML base
├── output/
│   └── results.html      # Resultados renderizados
├── input.json            # Prompts de prueba
├── .env                  # Variables de entorno
├── package.json
└── README.md
```

---

## ✨ Estilo de resultados

- Saltos de línea `\n` interpretados como `<br>`
- Respuestas con `<pre>` para preservar formato
- Match visual con colores: verde (✅), rojo (❌), gris (N/A)
- Parámetros mostrados como `{param}`

---

## 🔌 Añadir nuevos proveedores

1. Crea `src/providers/miProveedor.js`:

```js
export async function sendPrompt(prompt) {
  // Lógica de integración con tu proveedor
}
```

2. Regístralo en `src/config/providers.js`:

```js
import * as miProveedor from '../providers/miProveedor.js';

const PROVIDERS = {
  azure: azureOpenAI,
  miproveedor: miProveedor
};
```

---

## 📃 Licencia

MIT – libre para modificar y distribuir.
