from app.core.logger import logger
from app.factory import create_app
import uvicorn

app = create_app()


def start():
    logger.info("Starting uvicorn in reload mode")
    uvicorn.run(
        # "main:app",
        app,
        # host="0.0.0.0",
        # reload=True,
        port=8000,
    )


if __name__ == "__main__":
    start()
