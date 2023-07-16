import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

function DexcomRedirect() {
  const user_id = useSelector((state) => state.user_id);
  const navigate = useNavigate();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const expectedState = Cookies.get('dexcomState');

    if (state !== expectedState) {
      setError('State mismatch error');
      return;
    }

    if (code) {
      fetch('https://protected-badlands-72029.herokuapp.com/exchangeCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, user_id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          navigate('/dashboard');
        })
        .catch((error) => {
          setError('An error occurred while exchanging the code');
        });
    } else {
      setError('No auth code found');
    }
  }, [user_id]);

  return (
    <div>
      <h1>Redirecting...</h1>
      {error && <p>{error}</p>}
    </div>
  );
}



export default DexcomRedirect;
