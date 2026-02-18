<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Candidate;
use App\Models\Divisi;

class CandidateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $candidates = [
            [
                'name' => 'Kandidat Nomor Urut 1',
                'order' => 1,
                'image' => '/img/kandidat/kandidat.png',
                'visi' => 'Menjadikan organisasi sebagai wadah aspirasi yang inovatif, transparan, dan inklusif bagi seluruh anggota.',
                'misi' => [
                    'Meningkatkan kolaborasi antar divisi melalui program kerja yang terintegrasi.',
                    'Menyelenggarakan forum diskusi rutin untuk mendengar dan merealisasikan aspirasi anggota.',
                    'Meningkatkan standar kualitas setiap kegiatan yang diselenggarakan organisasi.',
                    'Mengoptimalkan penggunaan teknologi digital dalam manajemen administrasi organisasi.',
                    'Membangun karakter kepemimpinan yang berintegritas dan profesional.',
                    'Meningkatkan standar kualitas setiap kegiatan yang diselenggarakan organisasi.',
                ],
                'divisi_id' => 1,
            ],
            [
                'name' => 'Kandidat Nomor Urut 2',
                'order' => 2,
                'image' => '/img/kandidat/kandidat2.png',
                'visi' => 'Membangun ekosistem organisasi yang kreatif, mandiri, dan berdampak positif bagi lingkungan sekitar.',
                'misi' => [
                    'Mendorong pengembangan minat dan bakat anggota melalui pelatihan intensif.',
                    'Memperluas jaringan kerja sama dengan pihak eksternal untuk peluang kolaborasi.',
                    'Mewujudkan budaya kerja yang disiplin namun tetap mengedepankan kekeluargaan.',
                    'Menciptakan inovasi program kerja yang berbasis solusi atas masalah yang ada.'
                ],
                'divisi_id' => 2,
            ],
            [
                'name' => 'Kandidat Nomor Urut 3',
                'order' => 3,
                'image' => '/img/kandidat/kandidat3.png',
                'visi' => 'Menciptakan organisasi yang solid, adaptif terhadap perubahan, dan unggul dalam pencapaian prestasi.',
                'misi' => [
                    'Memperkuat koordinasi internal melalui sistem komunikasi yang lebih efisien.',
                    'Meningkatkan standar kualitas setiap kegiatan yang diselenggarakan organisasi.',
                    'Memfasilitasi ide-ide kreatif anggota untuk menjadi program kerja yang nyata.',
                    'Mengadakan program mentoring untuk pemantapan kompetensi anggota.',
                    'Meningkatkan standar kualitas setiap kegiatan yang diselenggarakan organisasi.'
                ],
                'divisi_id' => 3,
            ],
        ];

        foreach ($candidates as $data) {
            Candidate::create([
                'name' => $data['name'],
                'order' => $data['order'],
                'image' => $data['image'],
                'visi' => $data['visi'],
                'misi' => $data['misi'],
                'divisi_id' => $data['divisi_id'],
            ]);
        }
    }
}
