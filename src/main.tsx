import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router';
import { router } from './Routes/Routes.tsx';


const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
