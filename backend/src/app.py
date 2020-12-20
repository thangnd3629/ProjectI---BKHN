import pickle
from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from vncorenlp import VnCoreNLP
from datetime import datetime
from VietnameseTextClassification import settings
from VietnameseTextClassification.preProcessData import FeatureExtraction
from VietnameseTextClassification.train import train_model
from VietnameseTextClassification.predict import Predictor
from os import listdir
from VietnameseTextClassification.settings import MODEL_PATH,TEST_FILE_PATH

annotator = VnCoreNLP(r"D:\WebDev\ProjectI\backend\src\VnCoreNLP-1.1.1.jar", annotators="wseg,pos,ner", max_heap_size='-Xmx2g')



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


@app.route('/classification/train/<model>',methods=["POST"])
def handle_train_request(model):
    
    print('Reading Feature Extraction... ', str(datetime.now()))
    features_test_loader = pickle.load(open(settings.FEATURES_TEST,'rb'))
    features_train_loader = pickle.load(open(settings.FEATURES_TRAIN,'rb'))
    features_train, labels_train = FeatureExtraction(data=features_train_loader).read_feature()
    features_test, labels_test = FeatureExtraction(data=features_test_loader).read_feature()
    print('Read Feature Extraction Done! ', str(datetime.now()))

    try:
        train_model(model)
        return "200"
    except:
        #internal server error
        return "500"


@app.route('/classification',methods=["GET"])
def init():
    # fetch available trained models
    try:
        trained_models = listdir(MODEL_PATH)
        return {"trained_model":tuple(trained_models)}
    except:
        return "500"
@app.route('/classification/predict/<model>',methods=["POST"])
def handle_predict_request(model):
    requested_data = request.get_json()
    input = requested_data['input']
    f = open(TEST_FILE_PATH, "w",encoding='utf-16-le')
    f.write(input)
    f.close()
    pred = Predictor()
    
    try:
        return pred.predict(TEST_FILE_PATH,"logistic")[0]
    except:
        return "500"




if __name__ == "__main__":
    app.run(debug=True,threaded=True)
