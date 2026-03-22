# lk-seller

Каркас SPA на React + TypeScript + Vite 5: роутинг (`react-router-dom`), UI — Material UI, состояние — Zustand, данные — TanStack Query + Axios. В `package.json` задано `engines.node: >=20`.

## Требования

- **Node.js** v20 или новее (`nvm use` подхватит версию из `.nvmrc`).

## Установка и запуск

```bash
npm install
npm run dev
```

Откройте в браузере адрес, который покажет Vite (обычно `http://localhost:5173`).

### Сборка и предпросмотр production

```bash
npm run build
npm run preview
```

### Линтинг и форматирование

```bash
npm run lint
npm run format
npm run format:check
```

## Публикация в Git

Создайте репозиторий на [GitHub](https://github.com/new) или [Gitverse](https://gitverse.ru), затем:

```bash
git add .
git commit -m "Initial project setup"
git remote add origin <URL-вашего-репозитория>
git push -u origin main
```

---

## English

### Requirements

- **Node.js** v20+ (see `.nvmrc` for `nvm`).

### Install and run

```bash
npm install
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`).

### Build and preview

```bash
npm run build
npm run preview
```

### Lint and format

```bash
npm run lint
npm run format
npm run format:check
```

### Publish to Git

Create a repo on GitHub or Gitverse, then add `origin` and push as usual.
