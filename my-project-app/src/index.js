import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Components/Login';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-css/semantic.min.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Login /> */}
  </React.StrictMode>
);


// ReactDOM.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="home" element={<Home />} />
//       <Route path="Register" element={<Register />} />
//       <Route path="cart" element={<Cart />} />
//       <Route path="Promotionproduct" element={<Promotionproduct />} />
//       <Route path="/productfull/:productId" element={<ProductFull />} />
//       <Route path="/product/:productId" element={<ProductDetail />} />
//       <Route path="/Register/:productId" element={<Usersdetail />} />
//       <Route path="report" element={<Report />} />
//       <Route path="reportpromotion" element={<ReportPromotion />} />
//     </Routes>
//   </BrowserRouter>,
// document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
