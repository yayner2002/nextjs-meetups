import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const NewMeetupPage = () => {
  const router = useRouter();
  const newMeetupHandler = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Add new meetup</title>
        <meta
          name="description"
          content="Add your own meetup and create a network opportunity"
        />
      </Head>
      <NewMeetupForm onAddMeetup={newMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
