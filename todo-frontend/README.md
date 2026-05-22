# Todo App SRU

Aplikasi manajemen daftar tugas (To-Do List) full-stack yang dibangun dengan Laravel 13 (Backend API) dan Vue.js 3 (Frontend).

## Tech Stack

- **Backend**: Laravel 13, MySQL
- **Frontend**: Vue.js 3, Vite, Axios

## Fitur

- Tambah, lihat, edit, dan hapus task
- Toggle status selesai/belum dengan visual coret
- Pencarian task berdasarkan judul
- Filter: Semua, Aktif, Selesai
- Toast notification untuk feedback
- Progress bar persentase penyelesaian
- Rate limiting API (60 request/menit)
- Responsif untuk mobile

## Setup Backend

### Requirements
- PHP 8.3+
- Composer
- MySQL

### Langkah

1. Masuk ke folder backend:
```bash
   cd todo-backend
```

2. Install dependencies:
```bash
   composer install
```

3. Copy file environment:
```bash
   cp .env.example .env
```

4. Generate app key:
```bash
   php artisan key:generate
```

5. Sesuaikan konfigurasi database di `.env`:

6. Buat database `todo_app` di MySQL, lalu jalankan migrasi:
```bash
   php artisan migrate
```

7. Jalankan server:
```bash
   php artisan serve
```

API berjalan di `http://localhost:8000`

## Setup Frontend

### Requirements
- Node.js 18+

### Langkah

1. Masuk ke folder frontend:
```bash
   cd todo-frontend
```

2. Install dependencies:
```bash
   npm install
```

3. Jalankan development server:
```bash
   npm run dev
```

Frontend berjalan di `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | /api/tasks | Ambil semua task (support ?search=) |
| POST | /api/tasks | Buat task baru |
| PATCH | /api/tasks/{id}/toggle | Toggle status selesai |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Hapus task |