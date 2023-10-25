from fastapi import APIRouter, File, UploadFile
import pandas as pd
import numpy as np
import faiss

router = APIRouter()

CSV_PATH = 'app/data/all_flowers_2k.csv'
FAISS_INDEX_PATH = 'app/data/all_flowers_2k.index'
TOPN = 20


df_index = pd.read_csv(CSV_PATH)
df_id = df_index.copy()
df_id['index'] = df_id.index
df_id.index = df_id['id']
df_id.drop(columns=['id'], inplace=True)


faiss_index = faiss.read_index(FAISS_INDEX_PATH)


@router.get('/similar-photos/{image_name}')
async def get_inner_similar_photos(image_name: str):
    """Поиск по существующей базе фоток

    Args:
        image_name (str): имя файла фото

    Returns:
        list[str]: список имен файлов фото по уменьшению похожести
    """
    image_id = image_name.split('.')[0]
    image_index = df_id.loc[image_id, 'index']
    query_vector = faiss_index.reconstruct(int(image_index))
    Distances, Indices = faiss_index.search(
        query_vector.reshape(-1, len(query_vector)), TOPN)
    indeces = df_index.loc[Indices[0], 'id'] + '.jpg'

    return {'image_names': indeces.tolist()}


@router.post('/similar-photos')
async def get_similar_photos(image: UploadFile = File(...)):
    print(image)
    return {'image_names': []}
