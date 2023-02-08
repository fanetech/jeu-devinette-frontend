import React from 'react';
import './page-styles/home.css'
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../services/Constant';

const Home = () => {
    const navigate = useNavigate()
    const go = () => {
        navigate("../" + APP_URL.start );
    }
    return (
      <div className="home-container">
        <div className="btn-box">
          <span onClick={go}>Commencer</span>
        </div>
      </div>
    );
};

export default Home;