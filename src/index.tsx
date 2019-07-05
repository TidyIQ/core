import AppProvider from "./next/_app";
import DocumentProvider from "./next/_document";
import { store } from "./state/store";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Next.js
// ::::::::::::::::::::::::::::::::::::::::::::::::

// _app.tsx
export { AppProvider };

// _document.tsx
export { DocumentProvider };

// ::::::::::::::::::::::::::::::::::::::::::::::::
// State
// ::::::::::::::::::::::::::::::::::::::::::::::::

// Store
export { store };
