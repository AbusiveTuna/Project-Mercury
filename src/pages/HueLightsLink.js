import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './css/HueLightsLink.css';

function HueLightsLink() {
  const [ipAddress, setIpAddress] = useState('');
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.user_id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let username = 'CVpnIiE1NhIbnwQCV8BIgdH42JceNE6bgiuH29dv';
    let clientkey = 'E9AAC0018DC4AF545B21271E6AFE7B16';
        try {
          const response = await fetch('https://protected-badlands-72029.herokuapp.com/hueAuth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ipAddress, user_id, username, clientkey }),
          });
          const data = await response.json();
          console.log(data);
          alert('Authenticated successfully');
          navigate("/dashboard");
        } catch (err) {
          console.error(err); 
        }
    // try {
    //   const url = `http://${ipAddress}/api`;
    //   const body = {
    //     devicetype: 'projectmercury#webportal',
    //     generateclientkey: true,
    //   };
    //   const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(body),
    //   });
    //   const data = await response.json();
    //   if (data[0].error && data[0].error.type === 101) {
    //     alert('Link Button not pressed on bridge');
    //   } else {

    //     const username = data[0].success.username;
    //     const clientkey = data[0].success.clientkey;
    //     try {
    //       const response = await fetch('https://protected-badlands-72029.herokuapp.com/hueAuth', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ ipAddress, user_id, username, clientkey }),
    //       });
    //       const data = await response.json();
    //       console.log(data);
    //       alert('Authenticated successfully');
    //       navigate("/dashboard");
    //     } catch (err) {
    //       console.error(err); 
    //     }

    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };
  

  return (
    <div className="hue-lights-container">
      <h1>Phillips Hue Bridge IP Address</h1>
      <ol>
        <li>
          Make sure your bridge is connected to your network and is functioning
          properly. Test that the smartphone app can control the lights on the
          same network.
        </li>
        <li>
          Discover the IP address of the bridge on your network. You can do this
          in a few ways:
          <ul>
            <li>Use an mDNS discovery app to find Philips hue in your network.</li>
            <li>
              Use the broker server discover process by visiting{' '}
              <a href="https://discovery.meethue.com">
                https://discovery.meethue.com
              </a>
            </li>
            <li>
              Log into your wireless router and look Philips hue up in the DHCP
              table.
            </li>
            <li>
              Hue App method: Download the official Philips hue app. Connect your
              phone to the network the hue bridge is on. Start the hue app. Push
              link connect to the bridge. Use the app to find the bridge and try
              controlling lights. All working — Go to the settings menu in the
              app. Go to Hue Bridges. Select your bridge. The ip address of the
              bridge will show.
            </li>
          </ul>
        </li>
      </ol>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ipAddress">IP Address:</label>
        <input
          type="text"
          id="ipAddress"
          value={ipAddress}
          onChange={(event) => setIpAddress(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default HueLightsLink;
