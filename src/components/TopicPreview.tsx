// Topic.tsx

import * as React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface TopicProps {
  id: string; // Unique identifier for each topic
  title: string;
  description: string;
  date: string;
}

const Topic: React.FC<TopicProps> = ({ id, title, description, date }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/topic/${id}`); // Navigate to the topic's page when clicked
  };

  return (
    <Card sx={{ margin: '20px', boxShadow: 3 }} onClick={handleClick}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Topic;
