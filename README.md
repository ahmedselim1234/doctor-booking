# Doctor App

A doctor appointment booking web app built with React and TypeScript. Fully client-side with no backend required.

## Problem It Solves

Booking a doctor appointment traditionally requires phone calls, long hold times, and uncertainty about doctor availability, specialty, or cost. Patients often don't know which specialist to see or when they're available.

This app addresses that by giving patients a single interface to:

- **Discover the right doctor** — filter by medical specialty, rating, and consultation price before committing
- **See real availability** — view available days and time slots per doctor, eliminating back-and-forth scheduling
- **Book in minutes** — a guided 4-step wizard reduces friction: pick a day, pick a slot, enter details, confirm
- **Serve Arabic-speaking users** — full Arabic UI with RTL layout removes the language barrier common in medical platforms

## Features

- Browse and filter doctors by specialty, rating, and price
- Multi-step booking wizard (day → time slot → patient info → confirmation)
- Bilingual support: Arabic and English with full RTL layout for Arabic
- Animated UI with Framer Motion
- Form validation with React Hook Form and Zod

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS v4** — styling
- **Redux Toolkit** — booking state management
- **React Router v7** — client-side routing
- **React Hook Form** + **Zod** — form handling and validation
- **Framer Motion** — animations
- **Lucide React** — icons

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero, specialties, and featured doctors |
| `/doctors` | Full doctor listing with filters |
| `/booking/:doctorId` | 4-step booking wizard |
| `/confirmation` | Booking success screen |

## Project Structure

```
src/
├── pages/          # Route pages
├── components/
│   ├── layout/     # Header, Footer, PageWrapper
│   ├── booking/    # DayPicker, SlotPicker, BookingForm, ConfirmCard, StepIndicator
│   ├── doctors/    # DoctorCard, DoctorGrid, DoctorFilter
│   └── ui/         # Button, Input, Badge, Card, StarRating, DoctorAvatar, Logo
├── store/          # Redux store and bookingSlice
├── data/           # Static doctors data and slot generator
├── types/          # TypeScript interfaces
├── i18n/           # AR/EN translations and LangContext
└── hooks/          # useBooking hook
```

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```
