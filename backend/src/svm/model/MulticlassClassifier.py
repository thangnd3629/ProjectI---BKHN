# import numpy as np
# class Multiclass(object):
#     def __init__(self, model, num_classes):
#         self.clfs = []
#         self.model = model
#         self.num_classes = num_classes
#         self.ovo_init()
#     def ovo_init(self):
#         visited = [False for _ in range(self.num_classes)]

#         for input_class in range(self.num_classes):
#             self.clfs[input_class] = []
#             visited[input_class] = True
#             for target_class in range(self.num_classes):
#                 if not visited[target_class]:
#                     self.clfs[input_class].append({target_class:self.model})
                    
# # {
# #     "1":[{""}]
# # }
#     # def fit(self, X, y, epoch=1e3):
#     #     #one vs rest classifier
#     #     for i in range(self.num_classes):
#     #         y_ = np.where(y ==  i , 1, -1)
#     #         self.clfs[i].fit(X, y_)



#     # def predict(self, X):
#     #     pass



import numpy as np
class Multi_Svm(object):
    def __init__(self, n_classes, model):
        self.n_classes = n_classes
        self.clfs = []
        self.model = model
        
    def train(self, X, y):
        for k1 in np.arange(self.n_classes):
            for k2 in np.arange(k1+1,self.n_classes):
                print( 'k1 = ', k1, ', k2 = ', k2)
                data_k = self.data_one_vs_one(k1, k2, X, y)
                y_k = data_k[0]
                X_k = data_k[1]
                clf = self.model()
                clf.fit(X_k, y_k)
                self.clfs.append([clf, k1, k2])
    
    def data_one_vs_one(self, k1, k2, X_train, y_train):
        indexes_k1 = (y_train == k1)
        indexes_k2 = (y_train == k2)
        y_train_k = np.concatenate((y_train[indexes_k1], y_train[indexes_k2]))
        y_train_k_ = np.where(y_train_k == k1 , 1, -1)
        X_train_k = np.vstack((X_train[indexes_k1], X_train[indexes_k2]))
        return y_train_k_, X_train_k
    
    # def one_vs_one_transformed_labels(self, k1, k2, y_train_k):
    #     y = np.zeros(y_train_k.shape[0])
    #     for i in np.arange(y_train_k.shape[0]):
    #         if y_train_k[i] == k1:
    #             y[i] = 1
    #         else:
    #             y[i] = -1
    #     return y 
    
    def predict(self, X):
        predictions = []
        size = X.shape[0]

        for j in np.arange(size):
            x = X[j,:]
            scores = np.zeros(self.n_classes)
            for i in np.arange(len(self.clfs)):
                temp = self.clfs[i]
                clf = temp[0]
                k1 = temp[1]
                k2 = temp[2]
                pred = clf.predict(x)
                if pred == 1: 
                    scores[k1] += 1 
                else: 
                    scores[k2] += 1
            predictions.append(np.random.choice(np.where(scores==max(scores))[0]))

            if j % 100 == 0:
                print(j)  

        return np.array(predictions)
