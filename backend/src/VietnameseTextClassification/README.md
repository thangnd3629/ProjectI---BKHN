# Vietnamese-Text-Classification
Vietnamese Text Classification using Random Forest, K Nearest Neighbors, Logistic Regression, Support Vector Machine

## 1. Dataset
- This repo uses VNTC Dataset with 10 Topics: https://github.com/duyvuleo/VNTC

## 2. Run
- Tạo folder dataset and features:
```
./mkdir.sh
```

- Preprocess data
```
python preProcessData.py
```

- Training
```
python main.py -m <model name>
```

- Predict with pretrained model and a text file
```
python predict.py -i <filename document> -m <model name>
```