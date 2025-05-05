import express from "express";
import { allAccess, userBoard, moderatorBoard, adminBoard } from "../controllers/user.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

// Crea un router de Express para definir las rutas relacionadas con usuarios
const router = express.Router();

// Ruta pública: no requiere autenticación
router.get("/all", allAccess);

// Ruta solo para usuarios autenticados (requiere token JWT válido)
router.get("/user", [verifyToken], userBoard);

// Ruta solo para moderadores (requiere token + rol moderador)
router.get("/mod", [verifyToken, isModerator], moderatorBoard);

// Ruta solo para administradores (requiere token + rol admin)
router.get("/admin", [verifyToken, isAdmin], adminBoard);

// Exporta el router para que pueda ser usado en app.js o server.js
export default router;