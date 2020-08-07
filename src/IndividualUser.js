import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

export default function IndividualUser(props) {
  const [expand, setExpand] = useState(props.expand);
  const [user] = useState(props.user);

  const contentColorsforMonday = [
    "#00C875",
    "#4ECCC6",
    "#7E3B8A",
    "#333333",
    "#7F5347",
    "#FAA1F1",
    "#66CCFF",
    "#401694",
    "#784BD1",
    "#FFCB00",
    "#5559DF",
    "#579BFC",
    "#225091",
    "#FDAB3D",
    "#FFADAD",
    "#68A1BD",
    "#225091",
    "#FF7575",
    "#9AADBD",
    "#0085FF",
    "#323338",
    "#F65F7C",
    "#A358DF",
  ];
  useEffect(() => {
    if (props.expand == false) {
      setExpand(false)
    }
  }, [props.expand])

  const timeZone = (which, format = true) => {
    return format
      ? moment().tz(which).format("h:mm A")
      : moment().tz(which).format("LLLL");
  };



  return (
    <div
      onClick={() => (expand ? setExpand(props.expand) : setExpand(true))}
      className="item-container"
      style={{
        color: "#fff",
        background: contentColorsforMonday[props.index] || "#323338",
      }}
    >
      <div
        className={expand || props.expand ? "icon-name" : "icon-name minimize"}
        style={{ display: "flex" }}
      >
        <img src={user.photo_small} alt={user.name + " avatar"} />
        <div className={expand || props.expand ? "name show" : "name hide"}>
          {user.name}
        </div>
      </div>

      <div className="time-container expanded">

          <div style={{ display: "grid" }} className={expand || props.expand ? "show" : "hide"}>
            <span style={{padding: "5px 0", margin: "5px 0px"}}>{user.location ? user.location: user.country_code}</span> 
            <span style={{letterSpacing: "2px"}}>{timeZone(user.time_zone_identifier, false)}</span>
          </div>
          <div className={expand || props.expand ? "hide" : "show"} style={{fontWeight: "600",
    letterSpacing: "2px", fontSize: "1.3rem", width: "150px"}}>{timeZone(user.time_zone_identifier)}</div>

      </div>
    </div>
  );
}
