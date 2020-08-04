import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import IndividualUser from './IndividualUser';
const monday = mondaySdk();


export default function App() {
  const [users, setUsers] = useState(null);
  const [count, setCount] = useState(0);
  const [background, setBackground] = useState("#fff");
  const [dummydada] = useState([
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Philliphi dellshizdsdrz",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/Los_Angeles",
    },
    {
      name: "Person WithReally LongNameWutNow",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    }, 
    {
      name: "Another Person WithReally LongName WhatNow?",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    },
    ,    {
      name: "Phil",
      photo_small: "https://cdn1.monday.com/dapulse_default_photo.png",
      time_zone_identifier: "America/New_York",
    }
  ]);

  const [expand, setExpand] = useState(false);



  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    monday
      .api(`query { users { id, name, time_zone_identifier,  photo_small} }`)
      .then((res) => {
        setUsers(res.data.users);
      });

    monday.listen("settings", (res) => {
      setBackground(res.data.background);
    });
  }, []);
  return (
    <div className="App" style={{ background }}>
      {users ? (<Fragment>
      
        <div className="container">
          <button className="expand-button item-container" onClick={() => expand ? setExpand(false) : setExpand(true)}>{(expand) ? "Minimize": "Expand"}</button>
        {dummydada.map((user, key) => {

          return <IndividualUser user={user} key={key} expand={expand} index={key} />
        }

        )}
      </div></Fragment>) : (
        <p>Hello</p>
      )}
    </div>
  );
}
