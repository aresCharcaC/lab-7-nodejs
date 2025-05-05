import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middlewares/verifySignUp.js";

// Crea un router de Express para definir las rutas relacionadas con autenticación
const router = express.Router();

// Ruta para registrar un nuevo usuario (signup)
// Aplica dos middlewares antes de ejecutar la función signup:
// 1. checkDuplicateUsernameOrEmail: asegura que el username y el email no estén repetidos
// 2. checkRolesExisted: valida que los roles proporcionados existan en la base de datos
router.post("/signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], signup);

// Ruta para iniciar sesión (signin)
// No necesita middlewares previos, va directo al controlador signin
router.post("/signin", signin);

// Exporta el router para poder usarlo en la configuración principal de rutas de la app
export default router;