import numpy as np
import pandas as pd
import matplotlib.pyplot as plt 
from sklearn.utils import shuffle

train = shuffle(pd.read_csv("data/train.csv"))
test = shuffle(pd.read_csv("data/test.csv"))


X_train = pd.DataFrame(train.drop(['Activity','subject'],axis=1))
Y_train_label = train.Activity.values.astype(object)

X_test = pd.DataFrame(test.drop(['Activity','subject'],axis=1))
Y_test_label = test.Activity.values.astype(object)

# Dimension of Train and Test set 
print("Dimension of Train set",X_train.shape)
print("Dimension of Test set",X_test.shape,"\n")

# Transforming non numerical labels into numerical labels
from sklearn import preprocessing
encoder = preprocessing.LabelEncoder()

# encoding train labels 
encoder.fit(Y_train_label)
Y_train = encoder.transform(Y_train_label)

# encoding test labels 
encoder.fit(Y_test_label)
Y_test = encoder.transform(Y_test_label)

#Total Number of Continous and Categorical features in the training set
num_cols = X_train._get_numeric_data().columns
print("Number of numeric features:",num_cols.size)
#list(set(X_train.columns) - set(num_cols))


names_of_predictors = list(X_train.columns.values)

# Scaling the Train and Test feature set 
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)



# y_test , x_test_scaled

def accuracy(label, ground_truth):
    acc = (label == ground_truth)
    correct_sample = 0
    for i in acc:
        if i :
            correct_sample += 1
    return correct_sample/len(label)

from model.svm import SVM
from model.MulticlassClassifier import Multi_Svm
import pickle
# model = Multi_Svm(6, SVM )
# model.train(X_train_scaled, Y_train)
# pickle.dump(model, open('svm', 'wb'))
model = pickle.load(open('svm', 'rb'))
x_test_pred = model.predict(X_train_scaled)
print(accuracy(x_test_pred, Y_train))
