from flask import Flask
from flask import send_from_directory
from flask import request
from flask import jsonify

app = Flask(__name__)


# =====================================
# ALLOWED DEVICE IDS
# =====================================

ALLOWED_DEVICES = [

"TW96aWxsYS81LjAgKExpbnV4OyBBbmRyb2lkIDEwOyBLKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTQ3LjAuMC4wIE1vYmlsZSBTYWZhcmkvNTM3LjM2NDA3OTA0LTM5MA==",

]


# =====================================
# MAIN PAGE
# =====================================

@app.route("/")
def home():
    return send_from_directory(".", "index.html")


# =====================================
# CHECK DEVICE
# =====================================

@app.route("/check_device", methods=["POST"])
def check_device():

    data = request.json

    device_id = data.get("device_id")

    if device_id in ALLOWED_DEVICES:

        return jsonify({
            "allowed": True
        })

    return jsonify({
        "allowed": False
    })


# =====================================
# SERVICE WORKER
# =====================================

@app.route("/service-worker.js")
def sw():
    return send_from_directory(".", "service-worker.js")


# =====================================
# MANIFEST
# =====================================

@app.route("/manifest.json")
def manifest():
    return send_from_directory(".", "manifest.json")


# =====================================
# STATIC FILES
# =====================================

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(".", path)


# =====================================
# RUN SERVER
# =====================================

if __name__ == "__main__":

    print("Quiz Server Running...")

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )