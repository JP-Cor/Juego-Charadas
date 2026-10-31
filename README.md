# 🎭 Charadas — juego web

Juego de charadas en español para celular o computadora. Funciona sin servidor, sin base de datos y se puede publicar gratis en **GitHub Pages**.

## Archivos
- `index.html`: interfaz.
- `styles.css`: diseño adaptable.
- `words.js`: categorías y palabras.
- `app.js`: reglas, tiempo, puntos y controles.

## Ejecutar
Abre `index.html` en el navegador o usa Live Server en VS Code.

## Publicar en GitHub
1. Crea un repositorio público llamado `Charadas`.
2. Desde la carpeta del proyecto, ejecuta:

```bash
git init
git add .
git commit -m "Juego de Charadas inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/Charadas.git
git push -u origin main
```

3. En GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → main → / (root) → Save**.
4. La URL será `https://TU_USUARIO.github.io/Charadas/`.

## Uso
Elige categoría, dificultad y duración. Un jugador sostiene el teléfono en su frente y los demás dan pistas. Toca **Adiviné** o **Pasar**. Opcionalmente activa el movimiento (requiere HTTPS, navegador compatible y permiso). La inclinación puede variar entre dispositivos; los botones son el control universal.

## Personalizar
Edita `words.js` y agrega palabras con la dificultad `facil`, `medio` o `dificil`. No requiere instalación de dependencias.
