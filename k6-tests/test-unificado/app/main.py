import time
from flask import Flask, jsonify, request

app = Flask(__name__)

# Bytes de relleno por cada n para aumentar también el tráfico de red
FILLING_BYTES_PER_N = 1024


def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)



@app.route("/fibonacci", methods=["POST"])
def fibonacci_endpoint():
    """
    Acepta un JSON con el campo 'n' (entero ≥ 0).
    Devuelve el resultado junto con bytes de relleno proporcionales a n, lo que incrementa el tamaño de la respuesta con números más grandes. Una petición de un número grande aumenta el consumo de CPU, y la cantidad de tráfico de red. Además, más usuarios virtuales aumentan el uso de memoria. Todo esto permite comprobar la monitorización de los tres parámetros que puede monitorizar PodInsights con tan solo esta única aplicación.
    """
    body = request.get_json(silent=True) or {}
    n = body.get("n")

    if n is None:
        return jsonify({"error": "El campo 'n' es obligatorio."}), 400
    if not isinstance(n, int) or n < 0:
        return jsonify({"error": "'n' debe ser un entero no negativo."}), 400

    t0 = time.perf_counter()
    result = fibonacci(n)
    elapsed = time.perf_counter() - t0

    filling_size = n * FILLING_BYTES_PER_N

    return jsonify({
        "n": n,
        "result": result,
        "elapsed_seconds": round(elapsed, 4),
        "filling_size": filling_size,
        "filling": "x" * filling_size,
    })


@app.route("/health", methods=["GET"])
def health():
    """Liveness / readiness probe para Kubernetes."""
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    # threaded=True permite que Flask maneje cada petición en su propio hilo
    app.run(host="0.0.0.0", port=8080, threaded=True)