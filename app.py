from flask import Flask, jsonify
from flask_cors import CORS  # <--- NEW IMPORT
import mysql.connector

app = Flask(__name__)
CORS(app)  # <--- NEW: Enable Cross-Origin Resource Sharing

# CONFIGURATION
db_config = {
    'user': 'root',
    'password': 'MKingg@4343', # <--- DON'T FORGET TO PUT YOUR PASSWORD BACK!
    'host': 'localhost',
    'database': 'spotify_db'
}

@app.route('/')
def home():
    return "<h1>Backend is working! 🚀</h1>"

@app.route('/songs')
def get_songs():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM songs")
        songs = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(songs)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)