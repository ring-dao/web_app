// MainPage.tsx

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Topic from '../components/TopicPreview'; // Import the Topic component
import Demo_sdk from '../sdk/demo';

// Example data for topics
const topicsData = [
  {
    id: '1',
    title: 'Topic Title 1',
    description: 'This is a short description of the topic.',
    date: 'Published on 2024-04-28',
  },
  {
    id: '2',
    title: 'Topic Title 2',
    description: 'This is a short description of the topic.',
    date: 'Published on 2024-03-28',
  },
  // ...more topics
];

const MainPage: React.FC = () => {
  return (
    <div>
      <Grid container spacing={2} sx={{ padding: '20px' }}>
        {topicsData.map((topic) => (
          <Grid item xs={12} key={topic.id}>
            <Topic
              id={topic.id}
              title={topic.title}
              description={topic.description}
              date={topic.date}
            />
          </Grid>
        ))}
      </Grid>
      <Demo_sdk />
    </div>
  );
};

export default MainPage;
