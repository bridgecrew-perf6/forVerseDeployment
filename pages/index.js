 import {MongoClient} from 'mongodb';
import MeetupList from '../components/meetups/MeetupList'
import  Head from 'next/head';
import { Fragment } from 'react';

const HomePage=(props)=>{

 
    return(
      <Fragment>
        <Head>
          <title>All Meetups</title>
        </Head>
        <meta name="description" content="Use shouldComponentUpdate() to let React know if a component's output is not affected by the current change in state or props. The default behavior is to re- ..." />
        <MeetupList meetups={props.meetups}/>
      </Fragment>
      
    )
}


// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }


// export getStaticProps= async()=>{
  export async function getStaticProps(){

    const dbConnectionString= 'mongodb+srv://shashikumar_mango:mtvClustorOlu4135987@cluster0.zmeix.mongodb.net/Database01reactDecember?retryWrites=true&w=majority'

    const connection = await MongoClient.connect(dbConnectionString);
    const db = connection.db();
    const meetupsCollection = db.collection('newCollection');

    const meetups = await meetupsCollection.find().toArray();
    // console.log(meetups);

    connection.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;