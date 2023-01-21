import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

import Head from "next/head";

function HomePage(props) {
  return (
    <>
      <Head>
        \<title>Next Meetups</title>
        <meta
          name="description"
          content="This is a project website to practice on Next.js"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://grim_2022:rokdevil2001@cluster0.cbq8mrz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
