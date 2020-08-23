import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import IndividualUser from "./IndividualUser";
// import {fakeUsers} from './fakeusers'
const monday = mondaySdk();

export default function App() {
  const [originalUsers, setOriginalUsers] = useState(null)
  const [users, setUsers] = useState(null);
  const [count, setCount] = useState(0);
  const [enable, setEnable] = useState(false);
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
      .api(
        `query { users { id, name, time_zone_identifier, location, photo_small, country_code} }`
      )
      .then((res) => {
        setEnable(true);
        setOriginalUsers(res.data.users)
        setUsers(res.data.users);
      });

  }, []);

  const filterUser = e => {
    let newList = []
    for (let x of originalUsers) {
      let name = x.name.toLowerCase();
      let match = name.includes(e);

      if (match) {
        newList.push(x)
      } 
    }
    setUsers(newList)

  }

  return (
    <div className="App">

      {enable ? (
        <Fragment>
          <div className="container">
            <div className="expand-button item-container">
              <button
                onClick={() => (expand ? setExpand(false) : setExpand(true))}
              >
                {expand ? "Collapse" : "Maximize"}
              </button>
              <input placeholder="Filter User" onChange={e => filterUser(e.target.value)} />
            </div>

            {users && 
              users.map((thisusr, key) => {
                return (
                  <IndividualUser
                    user={thisusr}
                    key={key}
                    expand={expand}
                    index={key}
                  />
                );
              })}
          </div>
        </Fragment>
      ) : (
        <div className="center-this">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
