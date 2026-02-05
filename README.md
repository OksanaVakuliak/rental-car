# 🚗 Rental Car - Premium Service

A modern, high-performance car rental application built with **Next.js 16** (App
Router). This platform allows users to browse a vast catalog of premium cars,
filter them by specific criteria, manage favorites, and book their next ride
with ease.

**[🌐 Live Demo](https://rental-car-zeta-sandy.vercel.app/)**

---

## ✨ Features

- **Dynamic Car Catalog**: Browse a wide range of vehicles with smooth
  pagination.
- **Advanced Filtering**: Filter cars by brand, hourly price, and mileage range.
- **Real-time Search**: Instant UI updates without page reloads using optimized
  state management.
- **Detailed Car View**: Comprehensive technical specifications for every
  vehicle.
- **Booking System**: Integrated booking form with client-side validation.
- **Favorites Management**: Save your preferred cars to a persistent favorites
  list.
- **Fully Responsive**: Optimized for desktops, tablets, and mobile devices.
- **SEO Optimized**: Dynamic metadata and Open Graph support for every page.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server
  Components)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Global store
  for cars and favorites)
- **UI Components**: [Mantine UI](https://mantine.dev/) (Selects, Hooks, Dates)
- **Form Management**: [Formik](https://formik.org/) &
  [Yup](https://github.com/jquense/yup) (Validation)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: CSS Modules
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone [https://github.com/your-username/rental-car.git](https://github.com/your-username/rental-car.git)
cd rental-car
```

2. **Install dependencies:**

```bash
npm install
```

3. **Environment Variables:** Create a .env.local file in the root directory and
   add the following variables:

```env
NEXT_PUBLIC_API_BASE_URL='https://car-rental-api.goit.global'
NEXT_PUBLIC_LOCAL_API_URL='http://localhost:3000/api'
```

4.  **Run the development server:**

```bash
 npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## 📂 Project Structure

/app - Next.js App Router (Pages and API routes).

/components - Reusable UI components (CarCard, Filters, Loader, etc.).

/store - Zustand stores for global state management.

/lib - API clients and utility functions.

/types - TypeScript interfaces and types.

/public - Static assets (Favicon, Sprite, Images).
