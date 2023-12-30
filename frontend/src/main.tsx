import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <Router>
            
            <Routes>
                <Route exact path="/" element={ <App />} />
                <Route
                    path="*"
                    element={<div>Something went wrong</div>}
                />
            </Routes>
        </Router>
   
    </ErrorBoundary>
  </React.StrictMode>,
)
