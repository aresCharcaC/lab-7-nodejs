// Archivo para inicializar roles en la base de datos
// Guarda este archivo en backend/scripts/init-roles.js

import db from "../app/models/index.js";

const Role = db.role;

const initRoles = async () => {
  try {
    // Crear roles si no existen
    await Role.findOrCreate({ where: { name: "user" } });
    await Role.findOrCreate({ where: { name: "moderator" } });
    await Role.findOrCreate({ where: { name: "admin" } });
    
    console.log("Roles inicializados correctamente");
    process.exit(0);
  } catch (error) {
    console.error("Error al inicializar roles:", error);
    process.exit(1);
  }
};

// Conectar a la base de datos y ejecutar la inicialización
db.sequelize.sync()
  .then(() => {
    initRoles();
  })
  .catch(err => {
    console.error("Error al sincronizar la base de datos:", err);
    process.exit(1);
  });