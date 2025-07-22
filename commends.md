<!-- clear images  -->
docker rmi -f $(docker images -q)

<!-- clear containers all -->
docker rm -f $(docker ps -aq)

<!-- login adn push and pull  -->
docker login
docker pull mongo:7
docker tag mongo:7 fayzillodeveloper/mongo:7

<!-- build test -->
docker compose up --build

172 26 15 158


Topshiriq: NestJS yordamida Kutubxon boshqaruv tizimi yaratish
Maqsad:
NestJS va Prisma ORM yordamida kitobxona boshqaruv tizimi yaratish. Loyihada haqiqiy ma’lumotlar bazasidan foydalaniladi (PostgreSQL yoki SQLite).

🏗️ Talablar
🔹 Ma’lumotlar bazasi modellari (Prisma schema)
Book

id (int, auto-increment)

title (string)

author (string)

publishedYear (int)

genre (string)

isAvailable (boolean)

User

id (int, auto-increment)

name (string)

email (string, unique)

Borrow

id (int, auto-increment)

userId (foreign key)

bookId (foreign key)

borrowDate (datetime)

returnDate (datetime | nullable)

✅ API funksiyalari
📚 Kitoblar
POST /books — Yangi kitob qo‘shish

GET /books — Barcha kitoblarni ko‘rish

GET /books/:id — ID bo‘yicha kitobni ko‘rish

PATCH /books/:id — Kitob ma’lumotlarini tahrirlash

DELETE /books/:id — Kitobni o‘chirish

👤 Foydalanuvchilar
POST /users — Yangi foydalanuvchi qo‘shish

GET /users — Foydalanuvchilar ro‘yxati

🔄 Kitob ijarasi
POST /borrow — Kitobni foydalanuvchiga berish (userId, bookId)

POST /return — Kitobni qaytarish (borrowId)

GET /borrowed — Hozirda ijaraga olingan kitoblar ro‘yxati

⚙️ Qo‘shimcha talablar
isAvailable maydoni avtomatik yangilanib borishi kerak:

Kitob ijaraga berilsa: false

Qaytarilsa: true

Inputlar uchun DTO va class-validator dan foydalaning.

Loyihani modullar, servislar, va controller orqali strukturaviy tashkil eting.

🧪 Bonus (ixtiyoriy):
GET /users/:id/history — Foydalanuvchining barcha ijaralari tarixini qaytarsin.

NestJS Logger orqali ijaraga berilgan va qaytarilgan har bir kitob log qilinsin.