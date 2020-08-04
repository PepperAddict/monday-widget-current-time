import React, {useState} from 'react';
import moment from "moment-timezone";

export default function IndividualUser(props) {
    const [expand, setExpand] = useState(props.expand);
    const [user] = useState(props.user);
    const [smallexpand, setSmallExpand] = useState(false)
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
        "#A358DF"
      ];

    const timeZone = (which, format = true) => {
        let date = which;
        let now = moment.utc();
        return format
          ? moment().tz(which).format("h:mm a")
          : moment().tz(which).format("LLLL");
        // : moment.tz.zone(which).utcOffset(now);
      };
    return (
        <div
            onClick = {() => (expand) ? setExpand(props.expand) : setExpand(true)}
            className="item-container"
            style={{
              color: "#fff",
              background: contentColorsforMonday[props.index] || "#323338",
            }}
          >
            <div className={(expand || props.expand) ? "icon-name": "icon-name minimize"} style={{display: "flex"}}><img src={user.photo_small} alt={user.name + " avatar"} />
            <div className={(expand || props.expand) ? "name show" : "name hide"}>{user.name}</div></div>

            <div className="time-container expanded">{(expand || props.expand ) ? timeZone(user.time_zone_identifier, false) : timeZone(user.time_zone_identifier) }</div>

          </div>
    )
}