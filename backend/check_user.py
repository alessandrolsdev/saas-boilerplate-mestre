from app.db.session import SessionLocal
from app.models.user import User

db = SessionLocal()
user = db.query(User).filter(User.email == "admin@saasmestre.com").first()

if user:
    print(f"User found: {user.email}")
    print(f"Active: {user.is_active}")
    print(f"Password hash starts with: {user.hashed_password[:10]}")
else:
    print("User NOT found")
db.close()
