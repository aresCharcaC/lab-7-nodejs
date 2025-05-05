import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

// Validaciones
const validEmail = (value) => {
  if (!isEmail(value)) {
    return "Este no es un email válido.";
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return "El usuario debe tener entre 3 y 20 caracteres.";
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return "La contraseña debe tener entre 6 y 40 caracteres.";
  }
};

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    const { username, email, password } = data;
    setMessage("");
    setSuccessful(false);

    AuthService.register(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  {...register("username", { required: "Este campo es obligatorio!", validate: vusername })}
                />
                {errors.username && (
                  <div className="alert alert-danger" role="alert">
                    {errors.username.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  {...register("email", { required: "Este campo es obligatorio!", validate: validEmail })}
                />
                {errors.email && (
                  <div className="alert alert-danger" role="alert">
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  {...register("password", { required: "Este campo es obligatorio!", validate: vpassword })}
                />
                {errors.password && (
                  <div className="alert alert-danger" role="alert">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Registrarse</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
