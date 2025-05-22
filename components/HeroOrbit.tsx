import { twMerge } from "tailwind-merge";
import { PropsWithChildren } from "react";
import "../app/globals.css";

// Asegúrate de tener esta animación en tu CSS global (ej: globals.css)
/*
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
*/

export const HeroOrbit = ({
    children,
    size, // Distancia desde el centro de la órbita
    rotation, // Ángulo inicial en la órbita (en grados)
    shouldOrbit = false,
    orbitDuration = '60s', // Duración de una órbita completa
    shouldSpin = false, // Si el objeto debe girar sobre su propio eje
    spinDuration = '5s',   // Duración de una rotación sobre su propio eje
}: PropsWithChildren<{
    size: number;
    rotation: number;
    shouldOrbit?: boolean;
    orbitDuration?: string;
    shouldSpin?: boolean;
    spinDuration?: string;
}>) => {
    return (
        // 1. Contenedor que centra todo el sistema de órbita
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20">
            {/* 2. Elemento que define el "brazo" de la órbita y su rotación (la órbita en sí) */}
            {/* Este div gira, llevando consigo al objeto. */}
            <div
                className={twMerge(
                    "origin-center", // El brazo rota alrededor del centro del <div/> padre
                    shouldOrbit && "animate-spin" // Aplica la animación de órbita
                )}
                style={{
                    animationDuration: shouldOrbit ? orbitDuration : undefined,
                    // transform: `rotate(${rotation}deg)`, // La rotación inicial la manejaremos más abajo
                }}
            >
                {/* 3. Elemento de posicionamiento: empuja el objeto al radio 'size' y aplica rotación inicial */}
                {/* Este div está al final del "brazo" orbitante. */}
                <div
                    style={{
                        // La rotación inicial se aplica aquí para que el objeto comience en el ángulo deseado
                        // y luego se traslada hacia afuera para establecer el radio.
                        transform: `rotate(${rotation}deg) translateY(-${size}px)`,
                        // No es necesario transform-origin aquí si los divs hijos son inline-block o controlan su propio centro.
                    }}
                >
                    {/* 4. Elemento de Contra-Rotación (para mantener el objeto "erguido") */}
                    {/* Este div anula la rotación del "brazo" de la órbita para que el children no rote con la órbita. */}
                    <div
                        className={twMerge(
                            "origin-center", // Debe contrarotar sobre su propio centro
                            shouldOrbit && "animate-spin" // Usa la misma animación de órbita
                        )}
                        style={{
                            animationDuration: shouldOrbit ? orbitDuration : undefined,
                            animationDirection: shouldOrbit ? "reverse" : undefined, // ¡CLAVE! Gira en dirección opuesta.
                        }}
                    >
                        {/* 5. Elemento que GIRA SOBRE SÍ MISMO (el "spin" propio del children) */}
                        {/* Este div es para la rotación independiente del objeto sobre su propio eje. */}
                        <div
                            className={twMerge(
                                "inline-block origin-center", // inline-block para que se ajuste al tamaño del children
                                shouldSpin && "animate-spin" // Aplica el giro sobre sí mismo
                            )}
                            style={{
                                animationDuration: shouldSpin ? spinDuration : undefined,
                            }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// animate-spin [animation-duration:5s]