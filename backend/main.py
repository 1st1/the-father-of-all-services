from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/time")
def get_time():
    now = datetime.now(timezone.utc)
    return {"time": now.isoformat(), "formatted": now.strftime("%Y-%m-%d %H:%M:%S UTC")}
