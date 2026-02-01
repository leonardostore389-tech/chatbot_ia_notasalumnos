import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Conexión MongoDB Atlas
mongoose.connect(
  process.env.MONGODB_URI )
  
.then(() => console.log("✅ MongoDB conectado"))
.catch(err => console.error("❌ Error MongoDB:", err));

// 📦 Esquema de Alumno
const AlumnoSchema = new mongoose.Schema({
  nombre: String,
  grado: Number,
  periodo: String,
  notas: {
    matematica: Number,
    comunicacion: Number,
    ciencia: Number,
  }
});

const Alumno = mongoose.model("alumnos", AlumnoSchema);

// 📡 API - Obtener todos los alumnos
app.get("/api/alumnos", async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener alumnos" });
  }
});

// 🆕 Endpoint para agregar estudiantes
app.post("/api/alumnos", async (req, res) => {
  try {
    const alumno = new Alumno(req.body);
    await alumno.save();
    res.status(201).json(alumno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear estudiante" });
  }
});

// 🤖 Endpoint del Chat con IA
app.post("/api/chat", async (req, res) => {
  const { messages, model, temperature = 0.7, max_tokens = 1000 } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Se requiere un array de mensajes" });
  }

  try {
    // 📊 Obtener datos actualizados de alumnos
    const alumnos = await Alumno.find();

    // Construir contexto con información de estudiantes
    let contextoEstudiantes = "";
    
    if (alumnos.length > 0) {
      contextoEstudiantes = "\n\n📚 INFORMACIÓN DE ESTUDIANTES EN LA BASE DE DATOS:\n\n";
      
      alumnos.forEach(alumno => {
        const promedio = ((alumno.notas.matematica + alumno.notas.comunicacion + alumno.notas.ciencia) / 3).toFixed(2);
        const estado = parseFloat(promedio) >= 11 ? "APROBADO ✅" : "DESAPROBADO ❌";
        
        contextoEstudiantes += `• ${alumno.nombre}\n`;
        contextoEstudiantes += `  - Grado: ${alumno.grado}° de secundaria\n`;
        contextoEstudiantes += `  - Periodo: ${alumno.periodo}\n`;
        contextoEstudiantes += `  - Matemática: ${alumno.notas.matematica}\n`;
        contextoEstudiantes += `  - Comunicación: ${alumno.notas.comunicacion}\n`;
        contextoEstudiantes += `  - Ciencia: ${alumno.notas.ciencia}\n`;
        contextoEstudiantes += `  - Promedio: ${promedio}\n`;
        contextoEstudiantes += `  - Estado: ${estado}\n\n`;
      });

      // Estadísticas generales
      const aprobados = alumnos.filter(a => {
        const prom = (a.notas.matematica + a.notas.comunicacion + a.notas.ciencia) / 3;
        return prom >= 11;
      }).length;

      contextoEstudiantes += `📊 RESUMEN:\n`;
      contextoEstudiantes += `- Total de estudiantes: ${alumnos.length}\n`;
      contextoEstudiantes += `- Aprobados: ${aprobados}\n`;
      contextoEstudiantes += `- Desaprobados: ${alumnos.length - aprobados}\n`;
      contextoEstudiantes += `\n⚠️ IMPORTANTE: La nota mínima aprobatoria es 11.\n`;
    } else {
      contextoEstudiantes = "\n\n⚠️ No hay estudiantes registrados en la base de datos actualmente.\n";
    }

    // Modificar el mensaje del sistema para incluir el contexto
    const messagesWithContext = messages.map((msg, index) => {
      if (index === 0 && msg.role === "system") {
        return {
          role: "system",
          content: msg.content + contextoEstudiantes + 
            "\n\nCuando respondas preguntas sobre estudiantes, SIEMPRE basa tus respuestas ÚNICAMENTE en la información proporcionada arriba. Si te preguntan algo que no está en los datos, indica claramente que no tienes esa información."
        };
      }
      return msg;
    });

    // Llamar a Hugging Face API
    const HF_TOKEN = process.env.HF_TOKEN ;
    const API_URL = "https://router.huggingface.co/v1/chat/completions";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model || "meta-llama/Llama-3.2-3B-Instruct",
        temperature: parseFloat(temperature),
        max_tokens: parseInt(max_tokens),
        messages: messagesWithContext
      })
    });

    const rawText = await response.text();
    let data;

    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      console.error("Error al parsear respuesta:", rawText);
      return res.status(500).json({ 
        error: "Error al procesar la respuesta de la IA",
        details: rawText 
      });
    }

    if (!response.ok) {
      console.error("Error de Hugging Face:", data);
      return res.status(response.status).json({
        error: data?.error?.message || "Error en la API de Hugging Face",
        code: data?.error?.code,
        status: response.status
      });
    }

    // Retornar la respuesta en el formato esperado
    res.json({
      choices: [{
        message: {
          role: "assistant",
          content: data?.choices?.[0]?.message?.content || "No se pudo generar una respuesta."
        }
      }],
      model: data?.model || model,
      usage: data?.usage || {}
    });

  } catch (error) {
    console.error("Error en /api/chat:", error);
    res.status(500).json({ 
      error: "Error interno del servidor",
      message: error.message 
    });
  }
});

// 🏠 Ruta raíz
app.get("/", (req, res) => {
  res.send("🎓 Educator-AI Backend - Servidor funcionando correctamente");
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api`);
});