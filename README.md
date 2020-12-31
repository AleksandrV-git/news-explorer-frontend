# news-explorer-frontend
Версия 0.0.1

## О проекте:
Дипломный проект по итогам обучения в Яндекс.Практикум. Фронтенд сервиса, в котором можно найти новости по запросу и сохранить в личном кабинете. Проект состоит из двух страниц, собирается при помощи webpack, предусмотрены скрипты запускающие проект в режимах разработки, сборки и деплоя на gh-pages. Код написан на нативном JS c применением ES6 классов. Для получения новостей реализован запрос к newsapi.org, для авторизации пользователей и сохранения новостей используется ранее написанный бекэнд: https://github.com/AleksandrV-git/News-explorer-backend.

## Основной функционал:
- Регистрация. авторизация пользователей
- Поиск новостей по запросу, сохранение выбранных новостей в профиле
- Выборочное удаление сохраненных новостей

## Стэк технологий:
ES6, CSS3, HTML5, Webpack, ООП, структура CSS по БЭМ

## Пакеты которые используются в сборках:

   - "@babel/cli": "7.10.5",
   - "@babel/core": "7.11.4",
   - "@babel/plugin-proposal-class-properties": "7.10.4",
   - "@babel/preset-env": "7.11.0",
   - "autoprefixer": "9.8.6",
   - "babel-loader": "8.1.0",
   - "cross-env": "7.0.2",
   - "css-loader": "4.2.1",
   - "cssnano": "4.1.10",
   - "file-loader": "6.0.0",
   - "gh-pages": "~2.0.1",
   - "html-webpack-plugin": "4.3.0",
   - "image-webpack-loader": "6.0.0",
   - "mini-css-extract-plugin": "0.10.0",
   - "optimize-css-assets-webpack-plugin": "5.0.3",
   - "postcss-loader": "3.0.0",
   - "style-loader": "1.2.1",
   - "webpack": "4.44.1",
   - "webpack-cli": "3.3.12",
   - "webpack-dev-server": "3.11.0",
   - "webpack-md5-hash": "0.0.6"
   - "babel-polyfill": "6.26.0",
   - "core-js": "3.4.1"

## Инструкции по запуску:
- Скачать или склонировать репозитори
- Установить зависимости при помощи npm - `npm i`
- Запустить в development режиме - `npm run dev`
- Запустить сборку production-билда - `npm run build`
- Разместить production-билд на github pages - `npm run deploy`

## Ссылка на github pages:
https://aleksandrv-git.github.io/news-explorer-frontend/
## Ссылка на сайт:
https://www.news-v.students.nomoreparties.space
