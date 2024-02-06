import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import React from "react";

const HomePage = (props) => {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export const getServersideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  // fetch data from an API
  let meetups;
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://yay:yay123@cluster0.xg9ze5l.mongodb.net/nexjsmeetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    meetups = await meetupsCollection.find().toArray();
    client.close();
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // 10 seconds re pre
  };
};

export default HomePage;
