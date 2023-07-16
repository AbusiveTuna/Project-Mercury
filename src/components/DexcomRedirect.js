import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

function DexcomRedirect() {
  const user_id = useSelector((state) => state.user_id);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const expectedState = Cookies.get('dexcomState');

    if (state !== expectedState) {
      //probably handle error here?
      return;
    }

    if (code) {
      //Exchange the authorization code for an access token and refresh token
      const body = {
        client_id: 'dDX20kXs42fPePYsJSD011ykp9m4dsbV',
        client_secret: process.env.DEXCOM_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: 'Https://ProjectsMercury.com/dexcomRedirect',
      };
      fetch('https://api.dexcom.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(body),
      })
        .then((response) => response.json())
        .then((data) => {
          const { access_token, refresh_token } = data;
          fetch('https://protected-badlands-72029.herokuapp.com/storeDexcomTokens', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, access_token, refresh_token }),
          });
        })
        .catch((error) => {
          //?
        });
    } else {
      //No auth code
    }
  }, [user_id]);

  return <h1>Redirecting...</h1>;
}

export default DexcomRedirect;
