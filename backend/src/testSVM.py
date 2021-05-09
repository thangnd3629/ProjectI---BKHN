
from VietnameseTextClassification import settings
from VietnameseTextClassification.preProcessData import FeatureExtraction
from VietnameseTextClassification.train import train_model
from VietnameseTextClassification.predict import Predictor
from os import listdir
from VietnameseTextClassification.settings import MODEL_PATH,TEST_FILE_PATH
import pickle
features_test_loader = pickle.load(open(settings.FEATURES_TEST,'rb'))
features_train_loader = pickle.load(open(settings.FEATURES_TRAIN,'rb'))
features_train, labels_train = FeatureExtraction(data=features_train_loader).read_feature()
features_test, labels_test = FeatureExtraction(data=features_test_loader).read_feature()


print(type(features_train))