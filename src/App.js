import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import IndividualUser from './IndividualUser';
const monday = mondaySdk();


export default function App() {
  const [users, setUsers] = useState(null);
  const [count, setCount] = useState(0);
  const [background, setBackground] = useState("#fff");
  const [enable, setEnable] = useState(false)
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  useEffect(() => {
    monday
      .api(`query { users { id, name, time_zone_identifier, location, photo_small, country_code} }`)
      .then((res) => {
        setEnable(true)
        setUsers(res.data.users);
      });

    monday.listen("settings", (res) => {
      setBackground(res.data.background);
    });
  }, []);

  return (
    <div className="App" style={{ background }}>
      <span className="color-white" onClick={() => setBackground('#fff')}></span>
      {enable ? (<Fragment>
      
        <div className="container">
          <button className="expand-button item-container" onClick={() => expand ? setExpand(false) : setExpand(true)}>{(expand) ? "Collapse": "Maximize"}</button>
        { users && users.map((user, key) => {

          return <IndividualUser user={user} key={key} expand={expand} setExpand={setExpand} index={key} />
        }

        )}
      </div></Fragment>) : (
        <div className="center-this">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
      )}
    </div>
  );
}
