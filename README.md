# Multi-Step Form Wizard React Component

A clean, responsive multi-step form wizard built with React and CSS.

## Features
- **3-Step Process**: Personal Info → Address Information → Final Review
- **Step-by-Step Validation**: Instant validation for required fields, phone numbers, zip codes, and valid email patterns
- **Progress Indicator**: Clear step numbers with completed checkmarks and highlight styles
- **Review & Submit Screen**: Full breakdown of user input before submission with editable step navigation
- **Success View**: Confirmation card with option to reset and submit again

## Setup and Usage

1. Copy `form-wizard_App.jsx` and `form-wizard_App.css` into your Vite React project `src` directory.
2. Import `App` in your main entry file (`src/main.jsx`):

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './form-wizard_App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

3. Run Vite dev server:
```bash
npm run dev
```
