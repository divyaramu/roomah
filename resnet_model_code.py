# %%
import platform

# Install required packages
%pip install -q "openvino>=2023.1.0" "nncf>=2.6.0" torch torchvision tqdm --extra-index-url https://download.pytorch.org/whl/cpu

if platform.system() != "Windows":
    %pip install -q "matplotlib>=3.4"
else:
    %pip install -q "matplotlib>=3.4,<3.7"

# %%
# from pathlib import Path

# Set the data and model directories
# DATA_DIR = Path("data")
# MODEL_DIR = Path("model")
# change following line
# model_repo = "pytorch-resnet-models"

# DATA_DIR.mkdir(exist_ok=True)
# MODEL_DIR.mkdir(exist_ok=True)

# %%
# import sys
 
# might need to be changed
# if not Path(model_repo).exists():
#     !git clone https://github.com/chenyaofo/pytorch-cifar-models.git

# if not Path(model_repo).exists():

!git clone https://github.com/pytorch/vision.git

# sys.path.append(model_repo)

# %%
import matplotlib.pyplot as plt
import numpy as np

# %%
# change to a different model
# from pytorch_cifar_models import cifar10_mobilenetv2_x1_0

# change to a differnet model
# model = cifar10_mobilenetv2_x1_0(pretrained=True)

import torch
import torchvision.models as models
# from torchvision import transforms


model = models.resnet50(weights='DEFAULT')
model.fc = torch.nn.Linear(in_features=2048, out_features=2)

# %%
import openvino as ov

model.eval()

# change to match dataset dimenstions 
ov_model = ov.convert_model(model, input=[1, 3, 224, 224])
output_directory = "Users\intelaipc\Downloads"

model_name = "resnet_model.xml"

# ov.save_model(ov_model, MODEL_DIR / "mobilenet_v2.xml")
ov.save_model(ov_model, f"{output_directory}/{model_name}")

# %%
import torch
from torchvision import transforms

from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
# import torchvision.models as models



# need to work on this with our datasets
# from torchvision.datasets import CIFAR10

data_dir = "C:/Users/intelaipc/Downloads/train"

# transform = transforms.Compose(
#     [
#         transforms.Resize([224, 224]),
# 
#         transforms.ToTensor()
#         # transforms.Normalize((0.4914, 0.4822, 0.4465), (0.247, 0.243, 0.261)),
#     ]
# )

transform = transforms.Compose(
    [
        transforms.Resize((256, 256)),  # Resize to a larger size
        transforms.ToTensor()             # Convert images to tensor
    ]
)

# needs to be changed to our dataset
# check on needed preprocessing
# dataset = CIFAR10(root=DATA_DIR, train=False, transform=transform, download=True)

dataset = ImageFolder(root = data_dir, transform = transform)

dataloader = DataLoader(dataset, batch_size = 32, shuffle = False)

mean = 0.0
std = 0.0
total_images = 0

for images, _ in dataloader:
    batch_samples = images.size(0)  # batch size (number of images in batch)
    images = images.view(batch_samples, images.size(1), -1)  # Flatten the images
    mean += images.mean(dim=2).sum(dim=0)  # Sum of the means
    std += images.std(dim=2).sum(dim=0)    # Sum of the stds
    total_images += batch_samples

mean /= total_images
std /= total_images

print(f'Mean: {mean}')
print(f'Standard Deviation: {std}')

transform = transforms.Compose(
    [
        transforms.Resize((256, 256)),
        transforms.RandomCrop((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize(mean.tolist(), std.tolist()),  # Use the computed mean and std
    ]
)

# Check the structure of the dataset (optional)
print(f"Number of classes: {len(dataset.classes)}")
print(f"Class names: {dataset.classes}")

# val_loader = torch.utils.data.DataLoader(
#     dataset,
#     batch_size=1,
#     shuffle=False,
#     num_workers=0,
#     pin_memory=True,
# )

val_dataset = ImageFolder(root = "C:/Users/intelaipc/Downloads/test", transform = transform)
# val_dataloader = DataLoader(val_dataset, batch_size = 32, shuffle = False)
val_loader = DataLoader(
    val_dataset,
    shuffle = False,
)

# %%
model.eval()

predictions = []

with torch.no_grad():  # Disable gradient calculation
    for inputs, _ in dataloader:  # _ is the labels (we don't need them for inference)
        outputs = model(inputs)
        _, predicted = torch.max(outputs, 1)
        predictions.extend(predicted.numpy())  # Collect predictions

# Convert predictions to a more interpretable format if needed
predicted_classes = ['damaged' if pred == 0 else 'not_damaged' for pred in predictions]

print(predicted_classes)

# %%
import nncf

# check if needs changing
def transform_fn(data_item):
    image_tensor = data_item[0]
    return image_tensor.numpy()


quantization_dataset = nncf.Dataset(dataloader, transform_fn)

# %%
quant_ov_model = nncf.quantize(ov_model, quantization_dataset)

# %%
quantized_model_name = "quantized_resnet_model.xml"

ov.save_model(quant_ov_model, f"{output_directory}/{model_name}")

# %%
from tqdm.notebook import tqdm
import numpy as np


def test_accuracy(ov_model, data_loader):
    correct = 0
    total = 0
    for batch_imgs, batch_labels in tqdm(data_loader):
        result = ov_model(batch_imgs)[0]
        top_label = np.argmax(result)
        correct += top_label == batch_labels.numpy()
        total += 1
    return correct / total

# %%
import ipywidgets as widgets

core = ov.Core()
device = widgets.Dropdown(
    options=core.available_devices + ["AUTO"],
    value="AUTO",
    description="Device:",
    disabled=False,
)

device

# %%
core = ov.Core()
compiled_model = core.compile_model(ov_model, device.value)
optimized_compiled_model = core.compile_model(quant_ov_model, device.value)

orig_accuracy = test_accuracy(compiled_model, val_loader)
optimized_accuracy = test_accuracy(optimized_compiled_model, val_loader)

# %%
print(f"Accuracy of the original model: {orig_accuracy[0] * 100 :.2f}%")
print(f"Accuracy of the optimized model: {optimized_accuracy[0] * 100 :.2f}%")

# %%
# Inference FP16 model (OpenVINO IR)
!benchmark_app -m "model/mobilenet_v2.xml" -d $device.value -api async -t 15

# %%
# Inference INT8 model (OpenVINO IR)
!benchmark_app -m "model/quantized_mobilenet_v2.xml" -d $device.value -api async -t 15

# %%
# Define all possible labels from the CIFAR10 dataset
# update to reflect our dataset
labels_names = [
    "damaged",
    "not damaged"
]
all_pictures = []
all_labels = []

# Get all pictures and their labels.
for i, batch in enumerate(val_loader):
    all_pictures.append(batch[0].numpy())
    all_labels.append(batch[1].item())

# %%
import matplotlib.pyplot as plt


def plot_pictures(indexes: list, all_pictures=all_pictures, all_labels=all_labels):
    """Plot 4 pictures.
    :param indexes: a list of indexes of pictures to be displayed.
    :param all_batches: batches with pictures.
    """
    images, labels = [], []
    num_pics = len(indexes)
    assert num_pics == 4, f"No enough indexes for pictures to be displayed, got {num_pics}"
    for idx in indexes:
        assert idx < 10000, "Cannot get such index, there are only 10000"
        pic = np.rollaxis(all_pictures[idx].squeeze(), 0, 3)
        images.append(pic)

        labels.append(labels_names[all_labels[idx]])

    f, axarr = plt.subplots(1, 4)
    axarr[0].imshow(images[0])
    axarr[0].set_title(labels[0])

    axarr[1].imshow(images[1])
    axarr[1].set_title(labels[1])

    axarr[2].imshow(images[2])
    axarr[2].set_title(labels[2])

    axarr[3].imshow(images[3])
    axarr[3].set_title(labels[3])

# %%
def infer_on_pictures(model, indexes: list, all_pictures=all_pictures):
    """Inference model on a few pictures.
    :param net: model on which do inference
    :param indexes: list of indexes
    """
    output_key = model.output(0)
    predicted_labels = []
    for idx in indexes:
        assert idx < 10000, "Cannot get such index, there are only 10000"
        result = model(all_pictures[idx])[output_key]
        result = labels_names[np.argmax(result[0])]
        predicted_labels.append(result)
    return predicted_labels

# %%
indexes_to_infer = [7, 12, 15, 20]  # To plot, specify 4 indexes.

plot_pictures(indexes_to_infer)

results_float = infer_on_pictures(compiled_model, indexes_to_infer)
results_quanized = infer_on_pictures(optimized_compiled_model, indexes_to_infer)

print(f"Labels for picture from float model : {results_float}.")
print(f"Labels for picture from quantized model : {results_quanized}.")


