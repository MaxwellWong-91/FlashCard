import tensorflow as tf
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import tensorflow_datasets as tfds
import os
from fnmatch import fnmatch

"""
dataset = "words.tgz"

f = open(dataset, "rb")

print (f)
"""
root = "./words"
pattern = "*.png"
images = []
for path, subdirs, files in os.walk(root):
    for name in files:
        if fnmatch(name, pattern):
            images.append(os.path.join(path, name))
            #print (os.path.join(path, name))


#https://towardsdatascience.com/build-a-handwritten-text-recognition-system-using-tensorflow-2326a3487cd5
#https://medium.com/@vijayabhaskar96/tutorial-image-classification-with-keras-flow-from-directory-and-generators-95f75ebe5720
#plt.show(data[0])