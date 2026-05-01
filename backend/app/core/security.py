"""
安全工具
"""
from datetime import datetime, timedelta
import bcrypt
from jose import jwt


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode('utf-8'), hashed.encode('utf-8'))


def create_access_token(data: dict, expire: timedelta = None) -> str:
    to_encode = data.copy()
    expire = expire or timedelta(minutes=60 * 24 * 7)
    to_encode.update({"exp": datetime.utcnow() + expire})
    if "sub" in to_encode:
        to_encode["sub"] = str(to_encode["sub"])
    return jwt.encode(to_encode, "change-me-in-production", algorithm="HS256")


def decode_token(token: str) -> dict:
    payload = jwt.decode(token, "change-me-in-production", algorithms=["HS256"])
    if "sub" in payload:
        payload["sub"] = int(payload["sub"])
    return payload