import { useState } from "react";

function CrearAlumno() {

    const url = "https://servidorclasedaw.onrender.com";
    const espacio = "alumno6";

    const [nuevoAlumno, setNuevoAlumno] = useState({
        nombre: "",
        apellido1: "",
        apellido2: "",
        edad: "",
        sexo: "",
        curso: ""
    });

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setNuevoAlumno({
            ...nuevoAlumno,
            [e.target.name]: e.target.value
        });
    };

    const crearAlumno = () => {
        setMensaje("");
        setError("");

        fetch(`${url}/${espacio}/alumnos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...nuevoAlumno,
                edad: Number(nuevoAlumno.edad),
                curso: Number(nuevoAlumno.curso)
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error al crear el alumno");
                }
                return res.json();
            })
            .then(() => {
                setMensaje("Alumno creado correctamente");
                setNuevoAlumno({
                    nombre: "",
                    apellido1: "",
                    apellido2: "",
                    edad: "",
                    sexo: "",
                    curso: ""
                });
            })
            .catch(err => setError(err.message));
    };

    return (
        <div className="crear">
            <h2>Crear Alumno</h2>

            <input
                name="nombre"
                placeholder="Nombre"
                value={nuevoAlumno.nombre}
                onChange={handleChange}
            />

            <input
                name="apellido1"
                placeholder="Apellido 1"
                value={nuevoAlumno.apellido1}
                onChange={handleChange}
            />

            <input
                name="apellido2"
                placeholder="Apellido 2"
                value={nuevoAlumno.apellido2}
                onChange={handleChange}
            />

            <input
                type="number"
                name="edad"
                placeholder="Edad"
                value={nuevoAlumno.edad}
                onChange={handleChange}
            />

            <input
                name="sexo"
                placeholder="Sexo (M/F)"
                value={nuevoAlumno.sexo}
                onChange={handleChange}
            />

            <input
                type="number"
                name="curso"
                placeholder="Curso"
                value={nuevoAlumno.curso}
                onChange={handleChange}
            />

            <button onClick={crearAlumno}>Crear Alumno</button>

            {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default CrearAlumno;
