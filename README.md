# 🎓 Educator AI - Sistema Inteligente de Gestión Académica

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![AI](https://img.shields.io/badge/AI-Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)

## 📋 Descripción

**Educator AI** es un sistema inteligente de gestión académica que combina una API REST robusta con inteligencia artificial para el seguimiento y análisis del rendimiento estudiantil. El sistema permite gestionar estudiantes, visualizar métricas académicas en tiempo real y realizar consultas inteligentes mediante un chatbot educativo potenciado por IA.

## ✨ Características Principales

### 🤖 Chatbot Educativo con IA
- Integración con **Hugging Face API** (Llama 3.2)
- Respuestas contextuales basadas en datos reales de estudiantes
- Análisis automático de rendimiento académico
- Recomendaciones personalizadas

### 📊 Gestión de Estudiantes
- CRUD completo de estudiantes
- Registro de notas por materias (Matemática, Comunicación, Ciencia)
- Cálculo automático de promedios
- Sistema de aprobación/desaprobación

### 📈 Dashboard Interactivo
- Visualización en tiempo real de datos académicos
- Estadísticas generales (total de alumnos, aprobados, desaprobados)
- Tabla dinámica con código de colores por rendimiento
- Auto-actualización cada 30 segundos
- Diseño responsive y moderno

### 🔧 API RESTful
- Endpoints bien documentados
- Manejo robusto de errores
- Validación de datos
- CORS habilitado para integración frontend

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **Mongoose** - ODM para MongoDB
- **dotenv** - Gestión de variables de entorno

### IA & ML
- **Hugging Face API** - Inferencia de modelos de lenguaje
- **Meta Llama 3.2** - Modelo de lenguaje natural

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos modernos con gradientes y animaciones
- **Vanilla JavaScript** - Interactividad y consumo de API
- **Fetch API** - Peticiones HTTP asíncronas

## 📁 Estructura del Proyecto
```
educator-ai/
│
├── server.js              # Servidor principal y API
├── package.json           # Dependencias del proyecto
├── .env                   # Variables de entorno (no incluido)
├── alumnos.html          # Dashboard de visualización
└── README.md             # Documentación
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MongoDB Atlas (cuenta gratuita)
- Hugging Face API Token

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/educator-ai.git
cd educator-ai
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto:
```env
MONGODB_URI=tu_mongodb_connection_string
HF_TOKEN=tu_hugging_face_token
PORT=5000
```

4. **Iniciar el servidor**
```bash
# Modo producción
npm start

# Modo desarrollo (con nodemon)
npm run dev
```

5. **Abrir el dashboard**
- Abrir `alumnos.html` en el navegador
- El servidor debe estar corriendo en `http://localhost:5000`

## 📡 Endpoints de la API

### Estudiantes

#### Obtener todos los alumnos
```http
GET /api/alumnos
```

**Respuesta:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "grado": 3,
    "periodo": "2024-I",
    "notas": {
      "matematica": 15,
      "comunicacion": 14,
      "ciencia": 16
    }
  }
]
```

#### Crear nuevo alumno
```http
POST /api/alumnos
```

**Body:**
```json
{
  "nombre": "María García",
  "grado": 4,
  "periodo": "2024-I",
  "notas": {
    "matematica": 18,
    "comunicacion": 17,
    "ciencia": 19
  }
}
```

### Chat con IA

#### Enviar mensaje al chatbot
```http
POST /api/chat
```

**Body:**
```json
{
  "messages": [
    {
      "role": "system",
      "content": "Eres un asistente educativo."
    },
    {
      "role": "user",
      "content": "¿Cuántos alumnos están aprobados?"
    }
  ],
  "model": "meta-llama/Llama-3.2-3B-Instruct",
  "temperature": 0.7,
  "max_tokens": 1000
}
```

## 💡 Casos de Uso

1. **Seguimiento Académico**: Profesores pueden monitorear el rendimiento de sus estudiantes en tiempo real
2. **Análisis con IA**: Consultas inteligentes sobre estadísticas y tendencias académicas
3. **Alertas Tempranas**: Identificación automática de estudiantes en riesgo de desaprobación
4. **Reportes Automatizados**: Generación de informes mediante el chatbot

## 🎯 Características Técnicas Destacadas

- ✅ **Arquitectura RESTful** bien diseñada
- ✅ **Conexión segura** a MongoDB Atlas
- ✅ **Integración con IA** de última generación
- ✅ **Manejo de errores** robusto
- ✅ **Código limpio** y bien documentado
- ✅ **Diseño responsive** mobile-first
- ✅ **Auto-actualización** de datos en tiempo real

## 📊 Sistema de Evaluación

- **Nota mínima aprobatoria**: 11
- **Promedio**: Calculado sobre 3 materias
- **Código de colores**:
  - 🟢 Verde: Notas ≥ 14 (Excelente)
  - 🟡 Amarillo: Notas 11-13 (Aprobado)
  - 🔴 Rojo: Notas < 11 (Desaprobado)

## 🔐 Seguridad

- Variables sensibles en archivo `.env`
- Validación de datos en el backend
- Manejo seguro de tokens de API
- CORS configurado correctamente

## 🚧 Mejoras Futuras

- [ ] Autenticación de usuarios (JWT)
- [ ] Sistema de roles (admin, profesor, estudiante)
- [ ] Gráficos estadísticos avanzados (Chart.js)
- [ ] Exportación de reportes en PDF
- [ ] Notificaciones por email
- [ ] Integración con plataformas educativas (Moodle, Canvas)
- [ ] App móvil nativa
- [ ] Sistema de asistencias



## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Hugging Face](https://huggingface.co/) por proporcionar la API de IA
- [MongoDB Atlas](https://www.mongodb.com/atlas) por el hosting de base de datos
- Comunidad de desarrolladores de Node.js y Express

---

⭐ **Si este proyecto te fue útil, no olvides darle una estrella en GitHub!**
