import { defineConfig } from 'vite'

export default defineConfig({
    // Базовые настройки
    root: '.', // корневая папка
    build: {
        outDir: 'dist' // папка для сборки
    },
    server: {
        port: 3000 // порт dev-сервера
    }
})