/** @type {import('next').NextConfig} */
const nextConfig = {
  // Разрешаем загрузку скриптов с домена Telegram
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://telegram.org; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ];
  },
  // Настройки для GitHub Pages
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/tgbot-web-app' : '',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig; 