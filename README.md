# E-CommerceStore App

Aplicacion mobile de e-commerce construida con **React Native + Expo**, con flujo completo de compra y modulo de cuenta de usuario.

## Vista General

E-CommerceStore incluye:

- Onboarding y autenticacion (Login / Sign Up)
- Catalogo por categorias y busqueda
- Producto detalle
- Wishlist (favoritos)
- Bag (carrito)
- Checkout
- Direcciones con mapa y ubicacion
- Flujo de orden exitosa
- Modulo completo de **My Account** con subpantallas de configuracion

## Vistas De La Aplicacion

> Captura actual tomada desde el simulador iOS del proyecto.

![Vista actual de la app](docs/screenshots/app-current.png)

## Stack Y Herramientas

### Core

- **Expo SDK**: `~55.0.5`
- **React**: `19.2.0`
- **React Native**: `0.83.2`

### Librerias principales

- `react-native-maps` para mapa de direcciones
- `expo-location` para geolocalizacion
- `@react-native-community/slider`
- `expo-linear-gradient`
- `expo-status-bar`

### Entorno recomendado

- Node.js LTS
- Xcode (para iOS)
- Android Studio (para Android)
- Expo CLI via `npx expo`

## Estructura Del Proyecto

```text
E-CommerceStore/
├── App.js
├── app.json
├── index.js
├── package.json
├── assets/
├── ios/
└── src/
    ├── components/
    └── data/
```

## Flujo Principal De Pantallas

1. Onboarding
2. Login / Sign Up
3. Home (catalogo)
4. Product Detail
5. Wishlist / Bag
6. Checkout
7. Add Address (map + location)
8. Order Success
9. My Account + subpantallas (details, payment, addresses, password, notifications, language, help, terms, contact)

## Instalacion

1. Clona el repositorio.
2. Entra al proyecto.
3. Instala dependencias:

```bash
npm install
```

## Ejecucion

### Desarrollo general

```bash
npm run start
```

### iOS (nativo)

```bash
npm run ios
```

Si necesitas recompilar el binario nativo limpio:

```bash
npx expo run:ios --no-build-cache
```

### Android (nativo)

```bash
npm run android
```

### Web

```bash
npm run web
```

## Configuracion De Permisos (iOS)

Este proyecto ya incluye en `app.json`:

- `NSLocationWhenInUseUsageDescription`
- `NSLocationAlwaysAndWhenInUseUsageDescription`

Para aplicar cambios nativos de forma segura en iOS, usa recompilacion:

```bash
npx expo run:ios --no-build-cache
```

## Scripts Disponibles

```json
{
  "start": "expo start",
  "android": "expo run:android",
  "ios": "expo run:ios",
  "web": "expo start --web"
}
```

## Troubleshooting Rapido

- Si no ves cambios de UI: reinicia bundler y recompila iOS con `--no-build-cache`.
- Si falla mapa/ubicacion: valida permisos en `app.json` y recompila app nativa.
- Si hay conflicto de dependencias: elimina `node_modules` y ejecuta `npm install`.

## Capturas Adicionales

Puedes agregar mas screenshots en:

- `docs/screenshots/home.png`
- `docs/screenshots/product-detail.png`
- `docs/screenshots/my-account.png`
- `docs/screenshots/checkout.png`

Y luego referenciarlas en este README.

## Autor

Proyecto desarrollado y refinado para flujo completo de tienda mobile en React Native/Expo.
