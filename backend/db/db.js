var mongoose = require('mongoose');

const conectarBD = async () => {
  return await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Conexión a la BD exitosa");
    })
    .catch((e) => {
      console.error("Error al conectar con la BD", e);
    });
};

module.exports = conectarBD;

