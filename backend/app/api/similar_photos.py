from fastapi import APIRouter
import pandas as pd
import numpy as np

router = APIRouter()

DATA_PATH = 'app/data/'


@router.get('/similar-photos/{image_name}')
async def get_search_categories(image_name: str):
    """Поиск по существующей базе фоток

    Args:
        image_name (str): имя файла фото

    Returns:
        list[str]: список имен файлов фото по уменьшению похожести
    """

    return []
