from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from vncorenlp import VnCoreNLP

# To perform word segmentation, POS tagging, NER and then dependency parsing
annotator = VnCoreNLP(r"C:\\Users\\Thang\Documents\\GitHub\\ProjectI---BKHN\backend\\src\\VnCoreNLP-1.1.1.jar", annotators="wseg,pos,ner", max_heap_size='-Xmx2g') 


# To perform word segmentation, POS tagging and then NER
# annotator = VnCoreNLP("<FULL-PATH-to-VnCoreNLP-jar-file>", annotators="wseg,pos,ner", max_heap_size='-Xmx2g') 
# To perform word segmentation and then POS tagging
# annotator = VnCoreNLP("<FULL-PATH-to-VnCoreNLP-jar-file>", annotators="wseg,pos", max_heap_size='-Xmx2g') 
# To perform word segmentation only
# annotator = VnCoreNLP("<FULL-PATH-to-VnCoreNLP-jar-file>", annotators="wseg", max_heap_size='-Xmx500m') 
    


# To perform word segmentation only

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return "<h1>Hello</h1>"
@app.route('/ner', methods=["POST"])
def ner_extract():

    requested_data = request.get_json()
    print(requested_data)
    
    sentence = requested_data['input']
    annotated_text = annotator.annotate(sentence)
    return annotated_text
@app.route('/textclassification',methods=["POST"])
def classification():
    requested_data = request.get_json()
    sentence = requested_data['input']
    return "OK"    
    

    

if __name__ == "__main__":
    app.run(debug=True)
