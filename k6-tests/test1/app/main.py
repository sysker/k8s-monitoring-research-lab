import time
from flask import Flask, jsonify

app = Flask(__name__)


def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


@app.route("/fibonacci", methods=["GET"])
def fibonacci_endpoint():
    n = 35
    result = fibonacci(n)

    return jsonify({
        "n": n,
        "result": result,
        "elapsed_seconds": round(elapsed, 4),
    })


@app.route("/health", methods=["GET"])
def health():
    """Liveness / readiness probe para Kubernetes."""
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)