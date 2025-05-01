# Project Theodora (Nombre tentativo)

Este proyecto es una aplicación web frontend construida con React, TypeScript, Vite y Tailwind CSS. Incluye soporte para múltiples idiomas (internacionalización).

## Características Principales

*   **Framework:** React con TypeScript
*   **Bundler:** Vite
*   **Estilos:** Tailwind CSS
*   **Internacionalización (i18n):** `i18next` con soporte para Inglés, Español, Italiano y Portugués.
*   **Componentes:** Estructura basada en componentes reutilizables.

## Estado Actual

La aplicación base está implementada, incluyendo la estructura de componentes, internacionalización inicial, páginas legales (Política de Privacidad, Términos de Servicio, Política de Cookies), y configuración básica de rutas y assets (favicon, logo).

## Plan de Trabajo y Mejoras Propuestas

A continuación se detallan las áreas identificadas para mejora y las tareas asociadas:

### 1. Auditoría Completa de Internacionalización (i18n)
*   **Estado:** ✅ **Completado (Técnicamente)**
*   **Objetivo:** Asegurar que el 100% del texto visible al usuario sea traducible.
*   **Tareas Realizadas:**
    *   Revisión y refactorización de todos los componentes y páginas (incluyendo legales) para usar `i18next`.
    *   Extracción de textos a archivos `.json`.
    *   Verificación de textos en atributos (`alt`, `aria-label`, `title`, etc.).
    *   Adición de claves de traducción para todos los idiomas soportados (EN, ES, IT, PT), usando inglés como placeholder donde falta traducción.
*   **Tareas Pendientes:**
    *   Traducción manual de los textos placeholder en `es.json`, `it.json`, `pt.json`.
    *   Revisión legal del contenido de las páginas legales en todos los idiomas.
*   **Prioridad (Pendientes):** Alta (Traducción), Media (Revisión Legal)

### 2. Implementación de Pruebas Automatizadas
*   **Estado:** ⏳ **Pendiente**
*   **Objetivo:** Aumentar la robustez y facilitar refactorizaciones futuras.
*   **Tareas:**
    *   Configurar un entorno de pruebas (e.g., Vitest + React Testing Library).
    *   Escribir pruebas unitarias para componentes críticos (`Navbar`, `LanguageSelector`, `ContactForm`, etc.).
    *   Escribir pruebas de integración para flujos de usuario clave (cambio de idioma, envío de formulario).
*   **Prioridad:** Alta

### 3. Revisión y Mejora de Accesibilidad (a11y)
*   **Estado:** ⏳ **Pendiente**
*   **Objetivo:** Cumplir con los estándares WCAG para asegurar el uso por parte de todos los usuarios.
*   **Tareas:**
    *   Realizar auditoría con herramientas automáticas (Axe DevTools) y revisión manual.
    *   Corregir problemas: añadir/corregir atributos ARIA, mejorar contraste de colores, validar navegación por teclado, semántica HTML.
*   **Prioridad:** Alta

### 4. Optimización del Rendimiento Web
*   **Estado:** ⏳ **Pendiente**
*   **Objetivo:** Mejorar los tiempos de carga y la fluidez de la aplicación.
*   **Tareas:**
    *   Analizar métricas (Lighthouse, WebPageTest).
    *   Optimizar imágenes (formatos modernos, compresión, lazy loading).
    *   Analizar y reducir tamaño de bundles JS/CSS (Vite Analyzer, code splitting).
*   **Prioridad:** Media-Baja (ajustar según análisis)

### 5. Documentación y Calidad del Código
*   **Estado:** ⏳ **Pendiente**
*   **Objetivo:** Mejorar la mantenibilidad y colaboración.
*   **Tareas:**
    *   Añadir JSDoc/TSDoc a componentes y funciones complejas.
    *   Asegurar la aplicación consistente de linters y formateadores (`eslint`, `prettier`).
    *   Revisar y actualizar dependencias (`npm audit`, `npm outdated`). Eliminar dependencias no usadas.
*   **Prioridad:** Media

### 6. Configuración de Integración Continua / Despliegue Continuo (CI/CD)
*   **Estado:** ⚙️ **En Progreso (Preparación para GitHub Pages)**
*   **Objetivo:** Automatizar el proceso de pruebas y despliegue.
*   **Tareas Realizadas:**
    *   Configuración de scripts y dependencias para despliegue en GitHub Pages (ver sección Despliegue).
*   **Tareas Pendientes:**
    *   Crear un pipeline (e.g., GitHub Actions) para ejecutar linting, pruebas y build en cada cambio.
    *   Configurar despliegue automático a entornos (staging, producción) si es necesario más adelante.
*   **Prioridad:** Media

## Cómo Empezar (Desarrollo Local)

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd <directorio-del-proyecto>
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    # o yarn install o pnpm install
    ```
3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    # o yarn dev o pnpm dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## Scripts Disponibles

*   `npm run dev`: Inicia el servidor de desarrollo.
*   `npm run build`: Compila la aplicación para producción.
*   `npm run lint`: Ejecuta el linter (ESLint).
*   `npm run preview`: Sirve la build de producción localmente.

## Despliegue en GitHub Pages

Sigue estos pasos para desplegar la aplicación en GitHub Pages:

1.  **Instala `gh-pages`:**
    ```bash
    npm install gh-pages --save-dev
    ```

2.  **Configura `vite.config.ts`:**
    Asegúrate de que la opción `base` en tu archivo `vite.config.ts` esté configurada con el nombre de tu repositorio. Si tu repositorio se llama `mi-proyecto-theodora`, debería verse así:
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      base: '/mi-proyecto-theodora/', // <-- Asegúrate que coincida con el nombre de tu repo!
    })
    ```
    *Reemplaza `/mi-proyecto-theodora/` con `/<nombre-de-tu-repositorio>/`.*

3.  **Añade scripts de despliegue a `package.json`:**
    Abre tu archivo `package.json` y añade los siguientes scripts dentro del objeto `"scripts"`:
    ```json
    "scripts": {
      // ... otros scripts ...
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```
    *   `predeploy`: Se ejecuta automáticamente antes de `deploy` y asegura que la aplicación esté construida.
    *   `deploy`: Envía el contenido del directorio `dist` (la build de producción) a la rama `gh-pages` de tu repositorio.

4.  **Despliega la aplicación:**
    Ejecuta el script de despliegue:
    ```bash
    npm run deploy
    ```
    Esto creará (o actualizará) la rama `gh-pages` en tu repositorio de GitHub con la build de producción.

5.  **Configura GitHub Pages en tu Repositorio:**
    *   Ve a la configuración de tu repositorio en GitHub (`Settings` > `Pages`).
    *   En la sección `Build and deployment`, selecciona `Deploy from a branch`.
    *   Bajo `Branch`, selecciona la rama `gh-pages` y la carpeta `/ (root)`.
    *   Haz clic en `Save`.

    GitHub tardará unos minutos en desplegar tu sitio. Una vez listo, estará disponible en `https://<tu-usuario-github>.github.io/<nombre-de-tu-repositorio>/`.

---

*Este README y plan de trabajo fueron generados por una IA basándose en el análisis inicial del código.* 