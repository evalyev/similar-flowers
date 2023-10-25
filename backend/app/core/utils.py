import onnxruntime
import cv2
import numpy as np
import albumentations as A


class ModelWrapper:
    def __init__(self, model_path):
        self.model = onnxruntime.InferenceSession(
            model_path, providers=["CPUExecutionProvider"])
        self.input_name = self.model.get_inputs()[0].name
        self.output_name = self.model.get_outputs()[0].name

    def byte_to_image(self, bytes):
        image_array = np.asarray(bytearray(bytes), dtype='uint8')
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        return image

    def preprocess(self, image):
        test_transforms = A.Compose([
            A.Resize(height=232, width=232),
            A.CenterCrop(height=224, width=224),
            A.Normalize()
        ])  # torchvision слишком много весит

        image = test_transforms(image=image)['image']
        image = np.moveaxis(image, -1, 0)
        image = np.moveaxis(image, -1, 1)
        image = image.reshape(-1, *image.shape)
        return image

    def predict(self, image_bytes):
        image = self.byte_to_image(image_bytes)
        image = self.preprocess(image)
        input_data = {self.input_name: image}
        output = self.model.run(None, input_data)[0]
        return output[0]
