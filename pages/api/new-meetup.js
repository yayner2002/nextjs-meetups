import { MongoClient } from "mongodb";

const addMeetup = async (req, res) => {
  if (req.method === "POST") {
    const userMeetupObj = req.body;
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://yay:yay123@cluster0.xg9ze5l.mongodb.net/nexjsmeetups?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(userMeetupObj);
      console.log(result);
      client.close();
      res.status(201).json({ message: "Meetup inserted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error inserting data" });
    }
  }
};

export default addMeetup;
