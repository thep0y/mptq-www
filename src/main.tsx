import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Footer } from 'antd-mobile'
import 'antd-mobile/es/global'
import { LazyHome, LazyResult, LazyScale } from '~/pages'
import suspense from '~/advance/suspense'
import '~/index.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: suspense(<LazyHome />),
  },
  {
    path: '/scale',
    children: [
      {
        path: ':path',
        element: suspense(<LazyScale />),
      },
    ],
  },
  {
    path: '/result',
    children: [
      {
        path: ':path',
        element: suspense(<LazyResult />),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Footer
      content={'版权所有：知己心理　  　备案号：冀ICP备2023038023号-1'}
    ></Footer>
  </React.StrictMode>,
)
