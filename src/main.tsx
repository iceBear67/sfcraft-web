import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './index.css'
import SchematicsUploader from './SchematicsUploader.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <Routes>
          <Route path={"/schematics/upload"} element={<SchematicsUploader />} />
      </Routes>
  </BrowserRouter>,
)
