import React, { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import moment from "moment-timezone";
const monday = mondaySdk();
const apiKey = process.env.API2

export default function App() {
  const [users, setUsers] = useState(null);
  const [background, setBackground] = useState('#fff')

  const timeZone = (which, format = true) => {
    const now = moment.utc();

    return format
      ? moment().tz(which).format("LLLL")
      : moment.tz.zone(which).utcOffset(now);
  };

  useEffect(() => {
    // monday.setToken(apiKey)
    // monday.api(`query { users { id, name } }`).then((res) => {
    //   console.log(res)

    // })
    monday.listen("settings", (res) => {
      setBackground(res.data.background)
      console.log(res.data.background)
    });

    fetch("https://api.monday.com/v2", {
      method: "POST",
      body: JSON.stringify({
        query: "{users { name, photo_small, time_zone_identifier}}",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        setUsers(response.data.users);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App" style={{ background }}>
      {users ?
        users.map((user, key) => (
          <div key={key}>
            <img src={user.photo_small} alt={user.name + " avatar"} />
            {user.name} {timeZone(user.time_zone_identifier)}
          </div>
        )) : <p>Hello</p>}
    </div>
  );
}
