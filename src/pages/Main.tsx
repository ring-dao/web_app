import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, Paper, Container } from '@mui/material';
import Topic from '../components/TopicPreview'; // Import the Topic component
import Demo_sdk from '../sdk/demo';
import { getAllTopics } from '../backendInteraction/topics/getTopic'; // Import the getAllTopics function
import { ITopic } from '../interface'; // Import the ITopic interface

const MainPage: React.FC = () => {
  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const fetchedTopics = await getAllTopics();
        setTopics(fetchedTopics);
      } catch (error) {
        console.error('Failed to load topics:', error);
      }
    };

    loadTopics();
  }, []);

  if (!topics.length) {
    return <Typography sx={{ padding: 2, textAlign: 'center' }}>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Topics Overview
        </Typography>
        <Button variant="contained">
          Add New Topic
        </Button>
      </Box>
      <Grid container spacing={3}>
        {topics.map((topic) => (
          <Grid item xs={12} sm={6} md={4} key={topic.id}>
            <Card raised sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {topic.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {topic.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button size="small" color="primary">
                  View
                </Button>
                <Button size="small" color="secondary">
                  Edit
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Demo_sdk />
    </Container>
  );
};

export default MainPage;