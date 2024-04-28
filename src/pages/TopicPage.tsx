// TopicPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

// Replace with the type of your actual data structure
interface TopicData {
  id: string;
  title: string;
  description: string;
  date: string;
}

const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Capture the `id` from the URL
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  
  useEffect(() => {
    // Mocking an API call with a timeout to simulate network delay
    const fetchTopicData = async (topicId: string) => {
      // Simulated delay of 1 second (1000ms)
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      await delay(1000);

      // Mock data
      const mockApiResponse: TopicData = {
        id: topicId,
        title: 'Mocked Topic Title',
        description: 'This is a mocked description of the topic. It contains all the details you might expect from an actual API response.',
        date: 'Published on 2024-04-28',
      };

      setTopicData(mockApiResponse);
    };

    if (id) {
      fetchTopicData(id);
    }
  }, [id]);

  // Handle the case where data is not yet loaded
  if (!topicData) {
    return <div>Loading...</div>;
  }

  // Now that we have the data, we can use it to populate our components
  return (
    <div>
      <Card raised sx={{ margin: '20px', boxShadow: 3 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {topicData.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {topicData.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {topicData.date}
          </Typography>
          {/* ... other content ... */}
        </CardContent>
      </Card>
      {/* Here you would include other components like VotingSection, CommentsSection, etc. */}
    </div>
  );
};

export default TopicPage;
