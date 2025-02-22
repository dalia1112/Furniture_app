import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './rtk/store/Store.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>

  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <App />
  </StrictMode>
  </QueryClientProvider>
  </BrowserRouter>
  </Provider>
)
