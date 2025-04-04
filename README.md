# React + TypeScript + Vite

## 📝 Project Overview

Website built with React, TypeScript, Ant Design, Tailwindcss, Vite, Axios,...

- [🚀 Features](#-features)
- [🔧 How To Use](#-how-to-use)
- [📂 Project Structure](#-project-structure)
- [🌍 Live Demo](#-live-demo)
- [🔗 Prerequisites](#-Prerequisites)

## 🚀 Features

- ⚡ Fast development with Vite + React + TypeScript
- 🎨 Beautiful UI with Ant Design & Tailwind CSS
- 🔄 API calls using Axios
- 📂 Modular and scalable project structure
- 🌍 Fully responsive design
- ✅ Unit testing with Jest


## 🔧 How To Use

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the development server

```bash
npm run dev
```

The project will be available at `http://localhost:5173/`

### 3️⃣ Run tests

```bash
npm run test
```

### 4️⃣ Run tests coverage

```bash
npm run test -- --coverage
```

## 📂 Project Structure

```bash
.
|   .env
|   .gitignore
|   .prettierrc
|   babel.config.js
|   eslint.config.js
|   index.html
|   jest.config.js
|   package-lock.json
|   package.json
|   postcss.config.js
|   README.md
|   tailwind.config.js
|   tsconfig.app.json
|   tsconfig.json
|   tsconfig.node.json
|   tsconfig.node.tsbuildinfo
|   tsconfig.tsbuildinfo
|   vite.config.d.ts
|   vite.config.ts
|
+---public
|       vite.svg
|
\---src
    |   App.tsx
    |   index.css
    |   main.tsx
    |   setupTests.ts
    |   vite-env.d.ts
    |
    +---assets
    |   +---fonts
    |   |       dronerangerpro_black.otf
    |   |       Inter.ttf
    |   |
    |   \---images
    |           arrow-drop-down.svg
    |           bottom-line.svg
    |           bxs-chevron-down.svg
    |           character.svg
    |           character1.svg
    |           character2.svg
    |           character3.svg
    |           character4.svg
    |           ethereum.svg
    |           header-back-ground.webp
    |           header-character.svg
    |           mail.svg
    |           main-background.svg
    |           main-background.webp
    |           new-arrival.svg
    |           phone.svg
    |           purple-cloud.svg
    |           react.svg
    |           reset-icon.svg
    |           search.svg
    |           world.svg
    |           yellow-background.svg
    |
    +---components
    |   +---common
    |   |   +---Button
    |   |   |       index.tsx
    |   |   |
    |   |   +---Card
    |   |   |   |   index.tsx
    |   |   |   |   styles.css
    |   |   |   |
    |   |   |   \---__tests__
    |   |   |           Card.test.tsx
    |   |   |
    |   |   \---Loading
    |   |           index.tsx
    |   |           styles.css
    |   |
    |   +---layout
    |   |   +---Footer
    |   |   |       index.tsx
    |   |   |
    |   |   \---Header
    |   |       |   HeaderBar.tsx
    |   |       |   HeaderSection.tsx
    |   |       |   index.tsx
    |   |       |   styles.css
    |   |       |
    |   |       \---__tests__
    |   |               HeaderBar.test.tsx
    |   |
    |   \---ui
    |       +---filter
    |       |   |   FilterByCategory.css
    |       |   |   FilterByCategory.tsx
    |       |   |   FilterComponent.css
    |       |   |   FilterComponent.tsx
    |       |   |
    |       |   \---__tests__
    |       |           FilterByCategory.test.tsx
    |       |           FilterComponent.test.tsx
    |       |
    |       \---skeleton
    |               SkeletonCard.css
    |               SkeletonCard.tsx
    |               SkeletonProductList.tsx
    |
    +---hooks
    |       useDebounce.ts
    |
    +---pages
    |   \---home
    |       |   index.tsx
    |       |   styles.css
    |       |
    |       \---__tests__
    |               index.test.tsx
    |
    +---services
    |       base.service.ts
    |       product.service.ts
    |
    +---test
    |       polyfills.ts
    |
    \---types
            product.ts
            query.ts
```

 ## 🌍 Live Demo
- **Frontend:** [Demo URL](https://tymex-interview-frontend-thanhle.vercel.app/)
- **Backend:** [API Server](https://tymex-mock-server-nodejs.onrender.com/)

## 🔗 Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (>= 16.x recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)



