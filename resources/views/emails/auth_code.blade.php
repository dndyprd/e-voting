<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kode Verifikasi Voting</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f1f5f9;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #1d4ed8;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 32px;
            text-transform: uppercase;
        }

        .header p {
            color: #bfdbfe;
            margin: 10px 0 0 0;
            font-size: 14px;
            font-weight: 500;
        }

        .content {
            padding: 40px 30px;
            text-align: center;
        }

        .content h2 {
            color: #1e3a8a;
            font-size: 24px;
            margin-bottom: 20px;
        }

        .content p {
            color: #4b5563;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }

        .code-box {
            display: inline-block;
            padding: 20px 40px;
            border: 2px dashed #3b82f6;
            border-radius: 12px;
            background-color: #eff6ff;
        }

        .code-text {
            font-size: 48px;
            font-weight: 800;
            color: #1e3a8a;
            letter-spacing: 12px;
            font-family: 'Courier New', Courier, monospace;
            cursor: pointer;
            -webkit-user-select: all;
            user-select: all;
        }

        .button {
            display: inline-block;
            padding: 14px 30px;
            background-color: #1d4ed8;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 16px;
        }

        .footer-note {
            margin-top: 40px;
            padding: 20px;
            background-color: #f8fafc;
            border-radius: 6px;
            border-left: 2px solid #3b82f6;
            text-align: left;
        }

        .footer-note h4 {
            color: #1e40af;
            margin: 0 0 10px 0;
            font-size: 14px;
        }

        .footer-note ul {
            margin: 0;
            padding-left: 20px;
            color: #475569;
            font-size: 13px;
        }

        .footer {
            padding: 30px;
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
            background-color: #fcfcfc;
        }
    </style>
</head>

<body>
    <div style="padding: 20px 0;">
        <div class="container">
            <div class="header">
                <h1>{{ config('app.name') }}</h1>
                <p>{{ config('app.organization') }}</p>
            </div>
            <div class="content">
                <h2>Kode Verifikasi Anda</h2>
                <p>
                    Halo, <strong>{{ $name }}</strong>!<br>
                    Gunakan kode di bawah ini untuk memverifikasi akun Anda dan melanjutkan proses voting di sistem
                    kami.
                </p>
                <div style="margin-bottom: 35px; white-space: nowrap;">
                    <div class="code-box" style="vertical-align: middle;">
                        <span class="code-text" id="authCode">{{ trim($auth_code) }}</span>
                    </div>
                </div>
                <div>
                    <a href="{{ config('app.url') }}/profile" class="button">Login & Vote Sekarang</a>
                </div>

                <div class="footer-note">
                    <h4>⚠️ Informasi Penting:</h4>
                    <ul>
                        <li>Kode ini bersifat rahasia, mohon tidak memberikannya kepada siapapun.</li>
                        <li>Satu kode hanya berlaku untuk satu kali pemungutan suara.</li>
                        <li>Jika Anda tidak merasa melakukan permintaan ini, silakan abaikan.</li>
                    </ul>
                </div>
            </div>
            <div class="footer">
                Terima kasih,<br>
                <strong style="color: #4b5563;">Panitia {{ config('app.name') }} | {{ config('app.year') }}</strong>
            </div>
        </div>
    </div>
    <script>
        function copyToClipboard() {
            const textElement = document.getElementById('authCode');
            const text = textElement.innerText.trim();
            const btn = document.getElementById('copyBtn');
            const icon = document.getElementById('copyIcon');
            const originalPath = icon.innerHTML;

            const successFeedback = () => {
                icon.innerHTML =
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />';
                btn.style.borderColor = '#059669';
                btn.style.color = '#059669';
                setTimeout(() => {
                    icon.innerHTML = originalPath;
                    btn.style.borderColor = '#e2e8f0';
                    btn.style.color = '#3b82f6';
                }, 2000);
            };

            const fallbackCopy = (textToCopy) => {
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    const successful = document.execCommand('copy');
                    if (successful) successFeedback();
                } catch (err) {
                    console.error('Fallback copy fail:', err);
                }
                document.body.removeChild(textArea);
            };

            if (!navigator.clipboard) {
                fallbackCopy(text);
                return;
            }

            navigator.clipboard.writeText(text).then(successFeedback).catch(() => {
                fallbackCopy(text);
            });
        }
    </script>
</body>

</html>
