import React, { useState } from 'react';
import './css/HueLightsLink.css';

function HueLightsLink() {
  const [ipAddress, setIpAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    //send IP backend
    //Get auth, add to state? redirect to dashboard.
  };

  return (
    <div>
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
