import db from "../models/index.js";

const { ROLES, user: User } = db;

// Middleware para verificar si el nombre de usuario o el correo electrónico ya están en uso
export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Buscamos un usuario con el mismo nombre de usuario
    const userByUsername = await User.findOne({
      where: { username: req.body.username }
    });

    // Si se encuentra un usuario con el mismo nombre de usuario, respondemos con un error
    if (userByUsername) {
      return res.status(400).json({ message: "¡El nombre de usuario ya está en uso!" });
    }

    // Buscamos un usuario con el mismo correo electrónico
    const userByEmail = await User.findOne({
      where: { email: req.body.email }
    });

    // Si se encuentra un usuario con el mismo correo electrónico, respondemos con un error
    if (userByEmail) {
      return res.status(400).json({ message: "¡El correo electrónico ya está en uso!" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Middleware para verificar si los roles proporcionados existen en la lista de roles permitidos
export const checkRolesExisted = (req, res, next) => {
  // Verificamos si se proporcionaron roles en la solicitud
  if (req.body.roles) {
    // Iteramos sobre cada rol proporcionado
    for (const role of req.body.roles) {
      // Si el rol no existe en la lista de roles permitidos, respondemos con un error
      if (!ROLES.includes(role)) {
        return res.status(400).json({ message: `¡El rol ${role} no existe!` });
      }
    }
  }

  // Si los roles son válidos o no se proporcionaron roles, pasamos al siguiente middleware
  next();
};