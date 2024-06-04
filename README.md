## Запуск проекта

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

1. Запускаем микрофронтенд админ-панели (по умолчанию порт 4202)

cd ./services/admin

```
npm start
```

2. Запускаем микрофронтенд приложения support (обращения разработчикам) (по умолчанию порт 4201)

cd ../services/support

```
npm start
```

3. Запускаем микрофронтенд host: связующее звено между микрофронтендами (по умолчанию порт 4200).
   (Перед этим необходимо запустить admin и support микрофронтенды)

cd ../services/host

```
npm start
```

Приложения имеют общий webpack-config, который находится в папке build-config (packages workspace). Так же можно создавать и использовать общие shared-компоненты, функции и т.д., и экспортировать их из модуля shared (packages workspace) в остальные приложения.
