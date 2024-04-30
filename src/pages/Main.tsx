import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllTopics } from '../backendInteraction/topics/getTopic';
import { ITopic } from '../interface';
import JoinDAO from '../components/JoinDAO';

const MainPage: React.FC = () => {
  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const fetchedTopics = await getAllTopics();
        const modifiedTopics = fetchedTopics.map((topic: { description: string; }) => ({
          ...topic,
          description: topic.description.length > 200 ? topic.description.substring(0, 200) + '...' : topic.description
        }));
        setTopics(modifiedTopics);
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
      <JoinDAO />
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Proposals Overview
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {topics.map((topic) => (
          <Grid item xs={12} sm={6} md={4} key={topic.id}>
            <Card raised sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                <b>{topic.title}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{
                  textAlign: 'justify',
                  border: '1px solid black',
                  padding: '8px',
                  borderRadius: '4px',
                  margin: '10px 0'
                }}>
                  {topic.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Button size="small" color="primary" component={Link} to={`/topic/${topic.id}`}>
                  View
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainPage;
