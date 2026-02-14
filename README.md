# 🗳️ E-Voting - Sistem Pemilihan Ketua Organisasi

Sistem E-Voting berbasis website yang dirancang untuk mempermudah proses pemilihan ketua organisasi secara digital, transparan, dan efisien. Project ini dibangun menggunakan teknologi modern untuk memastikan performa dan keamanan yang optimal.

---

## 🚀 Tech Stack

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Filament](https://img.shields.io/badge/Filament-FFA116?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🛠️ Cara Penggunaan (Setup)

Ikuti langkah-langkah di bawah ini untuk menjalankan project di lokal Anda:

### 1. Persiapan
Pastikan Anda sudah menginstal **PHP (v8.3+), Composer, Node.js,** dan **MySQL**.

### 2. Clone Repository
```bash
git clone https://github.com/dndyprd/e-voting.git
cd e-voting
```

### 3. Instalasi Dependency Backend
```bash
composer install
```

### 4. Instalasi Dependency Frontend
```bash
npm install
```

### 5. Konfigurasi Environment
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Lalu atur koneksi database dan nama organisasi Anda di dalam file `.env`:
```env
APP_NAME="Nama Aplikasi"
ORGANIZATION="Nama Organisasi"
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=e-voting
DB_USERNAME=root
DB_PASSWORD=password
```

### 6. Generate App Key
```bash
php artisan key:generate
```

### 7. Migrasi Database & Seeding (Opsional)
```bash
php artisan migrate
```

### 8. Menjalankan Aplikasi
Buka dua terminal dan jalankan perintah berikut:

```bash
composer run dev
```

Aplikasi dapat diakses di: `http://localhost:8000`

---

## 📸 Tampilan


---

## 📝 Kontribusi
Kontribusi selalu terbuka! Silakan lakukan **Fork** dan kirimkan **Pull Request** jika Anda ingin mengembangkan fitur baru.

## 📄 Lisensi
Project ini di bawah lisensi [MIT](LICENSE).

---
*Created by Dandy Pradnyana - 2026*
