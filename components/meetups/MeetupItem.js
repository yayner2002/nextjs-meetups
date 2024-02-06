import Image from "next/image";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function MeetupItem(props) {
  const router = useRouter();

  const meetupDetailHandler = () => {
    router.push("/meetups/" + props.id);
  };
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} fill />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          {/* <Link href={`/meetups/${props.id}`}>Show Details</Link> */}
          <button onClick={meetupDetailHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
