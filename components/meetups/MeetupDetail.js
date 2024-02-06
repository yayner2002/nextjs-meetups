import React from "react";
import classes from "./MeetupDetail.module.css";
const MeetupDetail = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.image} title={props.title} className={classes.image} />
      <h1 className={classes.title}>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetail;
