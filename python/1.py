import matplotlib.pyplot as plt
import pylab
import cv2
import numpy as np
from PIL import Image
import os


def conv(image, kernel):
    height, width = image.shape        # 获取图像的维度
    h, w = kernel.shape                 # 卷积核的维度

    # 经过卷积操作后得到的新的图像的尺寸
    new_h = height - h + 1
    new_w = width - w + 1
    # 对新的图像矩阵进行初始化
    new_image = np.zeros((new_h, new_w), dtype=np.float)

    # 进行卷积操作，矩阵对应元素值相乘
    for i in range(new_w):
        for j in range(new_h):
            new_image[i, j] = np.sum(
                image[i:i+h, j:j+w] * kernel)    # 矩阵元素相乘累加

    # 去掉矩阵乘法后的小于0的和大于255的原值，重置为0和255
    # 用clip函数处理矩阵的元素，使元素值处于（0，255）之间
    new_image = new_image.clip(0, 255)

    # 将新图像各元素的值四舍五入，然后转成8位无符号整型
    new_image = np.rint(new_image).astype('uint8')
    return new_image


if __name__ == "__main__":

    # 读取图像信息，并转换为numpy下的数组
    image = Image.open("图片.jpg", 'r')
    output_path = "./outputPic/"
    if not os.path.exists(output_path):
        os.mkdir(output_path)
    a = np.array(image)

    # sobel 算子
    sobel_x = np.array(([-1, 0, 1],
                        [-2, 0, 2],
                        [-1, 0, 1]))
    sobel_y = np.array(([-1, -2, -1],
                        [0, 0, 0],
                        [1, 2, 1]))
    sobel = np.array(([-1, -1, 0],
                      [-1, 0, 1],
                      [0, 1, 1]))

    # prewitt各个方向上的算子
    prewitt_x = np.array(([-1, 0, 1],
                          [-1, 0, 1],
                          [-1, 0, 1]))
    prewitt_y = np.array(([-1, -1, -1],
                          [0, 0, 0],
                          [1, 1, 1]))
    prewitt = np.array(([-2, -1, 0],
                        [-1, 0, 1],
                        [0, 1, 2]))

    # 拉普拉斯算子
    laplacian = np.array(([0, -1, 0],
                          [-1, 4, -1],
                          [0, -1, 0]))
    laplacian_2 = np.array(([-1, -1, -1],
                            [-1, 8, -1],
                            [-1, -1, -1]))

    kernel_list = ("sobel_x", "sobel_y", "sobel", "prewitt_x",
                   "prewitt_y", "prewitt", "laplacian", "laplacian_2")

    print("Gridient detection\n")
    for w in kernel_list:
        print("starting %s....." % w)
        print("kernel:\n")
        print("R\n")
        R = conv(a[:, :, 0], eval(w))
        print("G\n")
        G = conv(a[:, :, 1], eval(w))
        print("B\n")
        B = conv(a[:, :, 2], eval(w))

        I = np.stack((R, G, B), axis=2)     # 合并三个通道的结果
        Image.fromarray(I).save("%s//bigger-%s.jpg" % (output_path, w))
