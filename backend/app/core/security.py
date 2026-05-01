"""
安全工具
"""
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict, expire: timedelta = None) -> str:
    to_encode = data.copy()
    expire = expire or timedelta(minutes=60 * 24 * 7)
    to_encode.update({"exp": datetime.utcnow() + expire})
    return jwt.encode(to_encode, "change-me-in-production", algorithm="HS256")


def decode_token(token: str) -> dict:
    return jwt.decode(token, "change-me-in-production", algorithms=["HS256"])