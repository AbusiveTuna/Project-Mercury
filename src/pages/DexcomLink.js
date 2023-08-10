import React, { useState } from 'react';
import './css/DexcomLink.css';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function DexcomLink() {
  const [state] = useState(generateRandomString(16));
  const user_id = useSelector((state) => state.user_id);

  const handleLinkDexcom = () => {
    const client_id = 'dDX20kXs42fPePYsJSD011ykp9m4dsbV';
    const redirect_uri = 'Https://ProjectsMercury.com/dexcomRedirect';
    const response_type = 'code';
    const scope = 'offline_access';
    Cookies.set('dexcomState', state);
    Cookies.set('user_id', user_id);
    const authUrl = `https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}`;
    window.location.href = authUrl;
  };

  return (
    <div className="container">
      <h1>Link your Dexcom account</h1>
      <p>Click the button below to login to your Dexcom Account. On Successful Login you will be redirected to the Dashboard</p>
      <button onClick={handleLinkDexcom}>Link Dexcom</button>
    </div>
  );
}

export default DexcomLink;
