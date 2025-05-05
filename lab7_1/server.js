import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";

// Crea una instancia de la aplicación Express
const app = express();

// Configura las opciones de CORS para permitir acceso desde cualquier origen en producción
// o desde localhost:8080 en desarrollo
const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? "*" 
    : "http://localhost:8080"
};

// Aplica el middleware de CORS a la aplicación
app.use(cors(corsOptions));

// Middleware para analizar solicitudes con cuerpo en formato JSON
app.use(express.json());

// Middleware para analizar solicitudes con cuerpo en formato URL-encoded (formularios)
app.use(express.urlencoded({ extended: true }));

// Ruta simple para probar que el servidor está funcionando
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Node.js JWT Authentication API." });
});

// Define la ruta base para autenticación: /api/auth/signup y /api/auth/signin
app.use("/api/auth", authRoutes);

// Define la ruta base para pruebas de acceso según el rol del usuario: /api/test/*
app.use("/api/test", userRoutes);

// Define el puerto en el que se ejecutará el servidor. Usa el proporcionado por el entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Inicializa roles en la base de datos
const Role = db.role;
const initializeRoles = async () => {
  try {
    const count = await Role.count();
    if (count === 0) {
      await Role.create({ name: "user" });
      await Role.create({ name: "moderator" });
      await Role.create({ name: "admin" });
      console.log("Roles added to database successfully!");
    }
  } catch (err) {
    console.error("Error initializing roles:", err);
  }
};

// Sincroniza los modelos con la base de datos (sin borrar datos si force es false)
// Luego inicia el servidor y escucha en el puerto definido
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized");
  initializeRoles();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});