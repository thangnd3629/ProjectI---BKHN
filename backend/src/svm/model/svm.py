import numpy as np
class SVM:
    def __init__(self, lr = 1e-3, C=0.01, n_iters = 1000):
        self.lr = lr
        self.C = C
        self.n_iters = n_iters
        self.w = None
        self.b = None
    def fit(self, X, y):
    
        n_samples, n_feature = X.shape

        self.w = np.zeros(n_feature)
        self.b  = 0
        # grad decent
        for _ in range(self.n_iters):
            for idx, x_i in enumerate(X):
                condition = y[idx] * (np.dot(x_i, self.w)-self.b) >=1 
                if(condition):
                    self.w -= self.lr* (2*self.C * self.w)
                else:
                    self.w -= self.lr * (2*self.C * self.w - np.dot(x_i, y[idx]))
                    self.b -= self.lr * y[idx]
                                   
    def predict(self, X):
        output = np.dot(X, self.w) - self.b
        return np.sign(output)



