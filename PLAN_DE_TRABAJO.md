# Plan de Trabajo - Project Theodora

Este archivo detalla las tareas propuestas para mejorar el proyecto y permite hacer seguimiento de su progreso.

## Mejoras Propuestas

### 1. Auditoría Completa de Internacionalización (i18n)
*   **Objetivo:** Asegurar que el 100% del texto visible al usuario sea traducible.
*   **Prioridad:** Media
*   **Tareas:**
    - [ ] Revisar todos los componentes en `src/components` y `App.tsx`.
    - [ ] Verificar que textos en atributos (`alt`, `aria-label`, `title`, etc.) usen la función `t()`.
    - [ ] Asegurar la consistencia y completitud de los archivos de locales (`.json`).

### 2. Implementación de Pruebas Automatizadas
*   **Objetivo:** Aumentar la robustez y facilitar refactorizaciones futuras.
*   **Prioridad:** Alta
*   **Tareas:**
    - [ ] Configurar un entorno de pruebas (e.g., Vitest + React Testing Library).
    - [ ] Escribir pruebas unitarias para componentes críticos (`Navbar`, `LanguageSelector`, `ContactForm`, etc.).
    - [ ] Escribir pruebas de integración para flujos de usuario clave (cambio de idioma, envío de formulario).

### 3. Revisión y Mejora de Accesibilidad (a11y)
*   **Objetivo:** Cumplir con los estándares WCAG para asegurar el uso por parte de todos los usuarios.
*   **Prioridad:** Alta
*   **Tareas:**
    - [ ] Realizar auditoría con herramientas automáticas (Axe DevTools) y revisión manual.
    - [ ] Corregir problemas: añadir/corregir atributos ARIA, mejorar contraste de colores, validar navegación por teclado, semántica HTML.

### 4. Optimización del Rendimiento Web
*   **Objetivo:** Mejorar los tiempos de carga y la fluidez de la aplicación.
*   **Prioridad:** Media-Baja (ajustar según análisis)
*   **Tareas:**
    - [ ] Analizar métricas (Lighthouse, WebPageTest).
    - [ ] Optimizar imágenes (formatos modernos, compresión, lazy loading).
    - [ ] Analizar y reducir tamaño de bundles JS/CSS (Vite Analyzer, code splitting).

### 5. Documentación y Calidad del Código
*   **Objetivo:** Mejorar la mantenibilidad y colaboración.
*   **Prioridad:** Media
*   **Tareas:**
    - [ ] Añadir JSDoc/TSDoc a componentes y funciones complejas.
    - [ ] Asegurar la aplicación consistente de linters y formateadores (`eslint`, `prettier`).
    - [ ] Revisar y actualizar dependencias (`npm audit`, `npm outdated`). Eliminar dependencias no usadas.

### 6. Configuración de Integración Continua / Despliegue Continuo (CI/CD)
*   **Objetivo:** Automatizar el proceso de pruebas y despliegue.
*   **Prioridad:** Media
*   **Tareas:**
    - [ ] Crear un pipeline (e.g., GitHub Actions) para ejecutar linting, pruebas y build en cada cambio.
    - [ ] Configurar despliegue automático a entornos (staging, producción).

---

*Puedes marcar las tareas completadas cambiando `[ ]` por `[x]`.* 