// TopicPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button, Paper } from '@mui/material';
import { ITopic } from '../interface';
import { getTopicById } from '../backendInteraction/topics/getTopic'; // Assurez-vous que le chemin d'importation est correct

const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [topicData, setTopicData] = useState<ITopic | null>(null);

  useEffect(() => {
    const fetchTopicData = async () => {
      if (id) {
        try {
          const data = await getTopicById(id);
          setTopicData(data);
        } catch (error) {
          console.error('Failed to fetch topic:', error);
        }
      }
    };

    fetchTopicData();
  }, [id]);

  if (!topicData) {
    return <Typography sx={{ padding: 2 }}>Loading...</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" href="/">
          Back to Home Page
        </Button>
      </Box>
      <Card raised>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {topicData.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {new Date(topicData.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            {topicData.description}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default TopicPage;
