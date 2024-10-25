from translate import Translator
import sys
import json

def translate_text(from_lang, to_lang, text):
    translator = Translator(from_lang=from_lang, to_lang=to_lang)
    translation = translator.translate(text)
    return translation

if __name__ == "__main__":
    # Get arguments passed from the HTML/JavaScript part
    from_lang = sys.argv[1]
    to_lang = sys.argv[2]
    text = sys.argv[3]
    
    translation = translate_text(from_lang, to_lang, text)
    
    # Return the translation in JSON format
    result = {"translation": translation}
    print(json.dumps(result))
