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
- Interacciones por gestos (swipe y doble tap) en Home, Bag y Wishlist

## Galeria Visual (Portfolio)

Esta galeria esta preparada para mostrar las vistas principales de la app con un formato tipo portafolio.

### Vistas principales

<table align="center">
  <tr>
    <td align="center">
      <img src="docs/screenshots/onboarding.png" alt="Onboarding" width="300" height="650" /><br />
      <strong>Onboarding</strong>
    </td>
    <td align="center">
      <img src="docs/screenshots/login.png" alt="Login" width="300" height="650" /><br />
      <strong>Login</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/screenshots/home.png" alt="Home" width="300" height="650" /><br />
      <strong>Home</strong>
    </td>
    <td align="center">
      <img src="docs/screenshots/categories.png" alt="Categories" width="300" height="650" /><br />
      <strong>Categories</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/screenshots/product-details.png" alt="Product Detail" width="300" height="650" /><br />
      <strong>Product Detail</strong>
    </td>
    <td align="center">
      <img src="docs/screenshots/wishlist.png" alt="Wishlist" width="300" height="650" /><br />
      <strong>Wishlist</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/screenshots/bag.png" alt="Bag" width="300" height="650" /><br />
      <strong>Bag</strong>
    </td>
    <td align="center">
      <img src="docs/screenshots/checkout.png" alt="Checkout" width="300" height="650" /><br />
      <strong>Checkout</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/screenshots/add-address.png" alt="Add Address" width="300" height="650" /><br />
      <strong>Add Address</strong>
    </td>
    <td align="center">
      <img src="docs/screenshots/my-account.png" alt="My Account" width="300" height="650" /><br />
      <strong>My Account</strong>
    </td>
  </tr>
</table>

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

## Gestos E Interacciones

La aplicacion implementa gestos para acelerar acciones de compra y gestion de favoritos.

### Home

- **Swipe derecha en producto**: agrega el item a la bolsa.
- **Doble tap en producto**: agrega o quita el item de wishlist.
- **Tap simple en producto**: abre Product Detail.

### Bag

- **Swipe izquierda en item**: elimina el item de la bolsa.
- **Doble tap en item**: agrega o quita el item de wishlist.
- **Botones +/-**: ajustan cantidad dentro de la bolsa.

### Wishlist

- **Swipe izquierda en item**: elimina el item de wishlist.
- **Tap simple en item**: abre Product Detail.

### Notas de UX

- Los gestos estan pensados para evitar friccion en acciones frecuentes.
- Se mantiene compatibilidad con interacciones tactiles clasicas (tap y botones).
- El estado de favoritos y bolsa se sincroniza de forma global entre pantallas.

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

## Capturas Adicionales Opcionales

Si deseas ampliar la galeria, puedes agregar tambien:

- order-success.png
- account-details.png
- payment-method.png
- delivery-address.png
- notifications.png

## Autor

Proyecto desarrollado y refinado para flujo completo de tienda mobile en React Native/Expo.
