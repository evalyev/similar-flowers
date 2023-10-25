from fastapi import APIRouter
import pandas as pd

router = APIRouter()


CSV_PATH = 'app/data/all_flowers_2k.csv'
df_index = pd.read_csv(CSV_PATH)
df_index['id'] = df_index['id'] + '.jpg'


@router.get('/all-photos')
async def get_all_photos():
    """Возвращает список всех фото
    """
    return {'image_names': df_index['id'].tolist()}
