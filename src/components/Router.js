import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import { APP_URL } from '../services/Constant';
import Start from '../pages/Start';
import Ranking from '../pages/Ranking';

const Router = () => {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path={APP_URL.ranking} element={<Ranking />} />
            <Route path={APP_URL.home} element={<Home />} />
            <Route path={APP_URL.start} element={<Start />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
};

export default Router;