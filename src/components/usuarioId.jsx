import { useState, useEffect } from "react";

function UsuarioId() {

    const url = "https://servidorclasedaw.onrender.com";
    const espacio = "alumno6";

    const [id, setId] = useState("");
    const [alumno, setAlumno] = useState(null);
    const [error, setError] = useState("");

    const obtenerAlumno = () => {
        if (id === "") return;

        setError("");
        setAlumno(null);

        fetch(`${url}/${espacio}/alumnos/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("El alumno no está en la Base de Datos");
                }
                return res.json();
            })
            .then(data => setAlumno(data))
            .catch(err => setError(err.message));
    };

    useEffect(() => {
        obtenerAlumno();
    }, [id]);

    return (
        <div>
            <h2>Buscar Alumno por ID</h2>

            <input
                type="number"
                placeholder="ID alumno"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            <button onClick={obtenerAlumno}>Buscar Alumno</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {alumno && (
                <div>
                    <p>Nombre: {alumno.nombre}</p>
                    <p>Apellido 1: {alumno.apellido1}</p>
                    <p>Apellido 2: {alumno.apellido2}</p>
                    <p>Edad: {alumno.edad}</p>
                    <p>Curso: {alumno.curso}</p>
                </div>
            )}
        </div>
    );
}

export default UsuarioId;
