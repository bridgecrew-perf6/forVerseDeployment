// our-domain.com/new-meetup
import { useRouter } from 'next/router';
import Head from 'next/head';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch('/api/meetup-new', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // const data = await response.json();

    // console.log(data);

    router.push('/');
  }

  return <Fragment>
    <Head>
       <title>New Meetup</title>
       <meta name="description" content="3kx8ifQijcWuMoUZwxAv3mGgIv0FhVZjOEoiN2mJV5VvljHe7wuTuToTtpqWpWDQ2eHYGLV5mlcE9xRdWs51LKNAyhTqb9/wBVJxOPwoSSOLBr3gQHc3db9QdddjuKVgOXsRN6ETkeJGUe82ol4d8n0h1lkVPUveP8hQk2K74ABYvUan4Pg8khsiE+QrVMFyhhY91aQ/tnT7K2q8hhVBZFCjwUAVaxti0szLAciTPq4CDxbf3VLxHBMHhCBM7SEFQ+UZY0zAkF2PqUmwubakAa1pCrQPx54RCscrSLK8k8n5s5bkM4dmzKysiqouCrEAbai70JFKBbYWGCM2TDKI" />
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
  </Fragment>
}

export default NewMeetupPage;