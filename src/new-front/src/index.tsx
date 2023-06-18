import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Index from './routes/Index'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login'
import MyCars from './routes/MyCars'
import Layout from './components/Layout'

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Layout>
                <Index />
            </Layout>
        ),
    },
    {
        path: '/login',
        element: (
            <Layout>
                <Login />
            </Layout>
        ),
    },
    {
        path: '/my-cars',
        element: (
            <Layout>
                <MyCars />
            </Layout>
        ),
    },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
