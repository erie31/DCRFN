# Calculadora de Botín Medieval - Crónicas de RFN

Una Aplicación Web Progresiva (PWA) diseñada para agilizar el cálculo de experiencia y tesoros en partidas de rol medieval fantástico.

## 🏰 Características

- **Diseño Temático**: Interfaz premium con estética de pergamino y fuentes medievales.
- **Lógica de Drop Precis**:
  - **Equipamiento**: Tirada de 1d6 (solo cae con un 6). Selección aleatoria de la tabla de equipo del enemigo.
  - **Misceláneo**: 100% de probabilidad. Tirada de 1d3 para cantidad de objetos únicos.
- **Base de Datos Integrada**: Incluye un bestiario y catálogo de objetos extraídos de las Hojas de Cálculo oficiales.
- **Funcionalidad PWA**:
  - **Instalable**: Puedes añadirla a tu pantalla de inicio en Android, iOS o Escritorio.
  - **Modo Offline**: Gracias al Service Worker integrado, la app funciona perfectamente sin conexión a internet.
- **Responsive**: Totalmente optimizada para móviles y tablets.

## 🛠️ Tecnologías Utilizadas

- **HTML5 & CSS3**: Diseño con CSS Grid, Flexbox y animaciones personalizadas.
- **JavaScript Moderno**: Lógica de cálculo y manipulación del DOM.
- **Service Workers**: Para la capacidad offline y almacenamiento en caché de recursos.
- **PWA Manifest**: Configuración para la instalación como aplicación nativa.

## 🚀 Instalación y Uso

1.  Abre el archivo `index.html` en cualquier navegador moderno.
2.  Para instalarla, haz clic en el botón **"Instalar App"** en el pie de página o utiliza la opción del navegador "Instalar aplicación" / "Añadir a pantalla de inicio".
3.  **Uso**:
    - Selecciona un enemigo del menú desplegable.
    - Revisa sus estadísticas y habilidades especiales.
    - Haz clic en **"RECLAMAR BOTÍN"** para realizar las tiradas automáticas de dados y ver qué objetos han caído.

## 📜 Estructura del Proyecto

- `index.html`: Estructura principal de la aplicación.
- `styles.css`: Estilos visuales y temática de pergamino.
- `app.js`: Lógica de la calculadora y gestión del Service Worker.
- `data.js`: Base de datos de enemigos, equipo y objetos misceláneos.
- `manifest.json`: Configuración de la PWA.
- `sw.js`: Service Worker para funcionamiento offline.

---
*Desarrollado para la comunidad de Rol for Newbies (RFN).*
