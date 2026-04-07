# Food Application – Angular Project Documentation

## Overview

This project is a food ordering web application built using Angular. It demonstrates a modular architecture with clear separation between core logic, feature components, and layout structure. The application allows users to browse menu items, manage a cart, and interact with a responsive UI.

---

## Tech Stack

* **Framework:** Angular
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** PrimeNG
*

---

## Project Structure


src/app/
│
├── core/
│   ├── helper/        # HTTP interceptors and helpers
│   ├── models/        # Interfaces and type definitions
│   ├── services/      # Application-wide services
│
├── feature-component/
│   ├── cart/          # Cart functionality
│   ├── login/         # Login/authentication UI
│   ├── menu/          # Food menu display
│
├── layouts/
│   ├── header/        # Header component
│
├── app.routes.ts      # Routing configuration
├── app.config.ts      # App-level configuration


---

## Core Module Explanation

The core/ directory contains global, reusable logic:

* **Services**

  * auth.service.ts → Handles authentication logic
* auth.guard.ts → Handles unauthorised route 
  * cart.service.ts → Manages cart state
  * menu.service.ts → Handles menu data
  * storage.service.ts → Local/session storage abstraction
  * i18n.service.ts → Language and localization handling

* **Helpers**

  * auth.interceptor.ts → Intercepts HTTP requests (e.g., attach tokens)

* **Models**

  * Defines TypeScript interfaces for structured data handling

---

## Feature Components

Located under feature-component/, each folder represents a functional feature:

* **menu/**

  * Displays food items
  * Handles item listing and UI interaction

* **cart/**

  * Manages selected items
  

* **login/**

  * Provides authentication UI
  * Interacts with authentication service

---

## Layout Components

The layouts/ folder contains reusable UI structure:

* **header/**

  * Navigation and branding

These components are shared across multiple pages.

---

## Routing

Routing is defined in:


app.routes.ts


Responsibilities:

* Navigation between features (menu, cart, login)
* Route configuration and structure

---

## Key Features

* Modular Angular architecture
* Separation of concerns (UI, services, models)
* Cart management using services
* HTTP request interception
* Multi-language support (i18n)
* Responsive UI with Tailwind CSS


---


## Setup Instructions

### Prerequisites

* npm or yarn
* Angular CLI       : 21.2.6
* Angular           : 21.2.7
* Node.js           : 22.14.0 ((v18 or higher recommended))
* Package Manager   : npm 10.9.2
* Operating System  : win32 x64

Install Angular CLI globally (if not installed):

bash
npm install -g @angular/cli


---

### Installation

Extract the project and run:

bash
npm install


---

### Run the Application

bash
ng serve


Open in browser:


http://localhost:4200


---

### Build for Production

bash
ng build


Build output will be generated in:


dist/food-application/browser


---





