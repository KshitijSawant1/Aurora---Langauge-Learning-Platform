# app.py
from flask import Flask, request, jsonify
from translate import Translator

app = Flask(__name__)

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    text = data.get('text')
    from_lang = data.get('from_lang')
    to_lang = data.get('to_lang')

    if not text or not from_lang or not to_lang:
        return jsonify({'error': 'Missing parameters'}), 400

    # Perform the translation
    translator = Translator(from_lang=from_lang, to_lang=to_lang)
    translation = translator.translate(text)

    return jsonify({'translated_text': translation})

if __name__ == '__main__':
    app.run(debug=True)
