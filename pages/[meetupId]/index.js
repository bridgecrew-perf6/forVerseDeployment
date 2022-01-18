import {MongoClient,ObjectId} from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';


import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description}/>
      </Head>
      <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>
    
  );
}




export async function getStaticProps(context){
  //fetching data for a single meetup
  const meetupId = context.params.meetupId;
  // console.log(meetupId);

  const dbConnectionString= 'mongodb+srv://shashikumar_mango:mtvClustorOlu4135987@cluster0.zmeix.mongodb.net/Database01reactDecember?retryWrites=true&w=majority';


  const client = await MongoClient.connect(dbConnectionString);
  const db = client.db();

  const meetupsCollection = db.collection('newCollection');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props:{
      meetupData:{
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    }
  }
}

export async function getStaticPaths(){
  const dbConnectionString= 'mongodb+srv://shashikumar_mango:mtvClustorOlu4135987@cluster0.zmeix.mongodb.net/Database01reactDecember?retryWrites=true&w=majority';


  const connection = await MongoClient.connect(dbConnectionString);
  const db= connection.db();

  const collection = db.collection('newCollection');
  const dataFetched= await collection.find({},{_id:1}).toArray();

  connection.close();
  // console.log(dataFetched);
  return {
    fallback:false,
    paths: dataFetched.map(data=>({params:{meetupId:data._id.toString()}}))
  };

}

export default MeetupDetails;