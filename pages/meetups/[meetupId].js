import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import React from "react";

const MeetupInfo = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        address={props.meetupData.address}
        title={props.meetupData.title}
        description={props.meetupData.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://yay:yay123@cluster0.xg9ze5l.mongodb.net/nexjsmeetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetupsWithIdOnly = await meetupsCollection
    .find({}, { _id: 1 })
    .toArray();
  client.close();

  return {
    fallback: false,
    paths: meetupsWithIdOnly.map((meetups) => ({
      params: { meetupId: meetups._id.toString() },
    })),
  };
};
export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://yay:yay123@cluster0.xg9ze5l.mongodb.net/nexjsmeetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
};
export default MeetupInfo;
