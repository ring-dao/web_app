import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button, Paper, Grid, LinearProgress } from '@mui/material';
import { ITopic } from '../interface';
import { getTopicById } from '../backendInteraction/topics/getTopic';
import { voteTrue, voteFalse } from '../sdk/contractConnector';
import { getAddresses, LSAG_signature } from '../sdk/snapConnector';
import { RingSignature } from '@cypher-laboratory/alicesring-lsag';

const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [topicData, setTopicData] = useState<ITopic | null>(null);

  useEffect(() => {
    const fetchTopicData = async () => {
      if (id) {
        try {
          const data = await getTopicById(id);
          // Mock voting data
          data.voteFor = "120"; // Mock votes for
          data.voteAgainst = "80"; // Mock votes against
          setTopicData(data);
        } catch (error) {
          console.error('Failed to fetch topic:', error);
        }
      }
    };

    fetchTopicData();
  }, [id]);

  const handleVote = async (voteType: 'true' | 'false') => {
    const signature = await LSAG_signature(
      [
        '030066ba293cc22d0eadbe494e9bd4d6d05c3e09d74dff0e991075de74b2359678',
        '0316d7da70ba247a6a40bb310187e8789b80c45fa6dc0061abb8ced49cbe7f887f',
        '0221869ca3ae33be3a7327e9a0272203afa72c52a5460ceb9f4a50930531bd926a'
      ],
      'hello world',
      'messaggggeeee',
      (await getAddresses())[0]
    );
    if(id === undefined) throw new Error('id is undefined');
    const proposalId = id;  // Using the topic ID as the proposal ID
    const sign = RingSignature.fromBase64(signature);
    const voteFunction = voteType === 'true' ? voteTrue : voteFalse;

    await voteFunction(
      Number(proposalId),
      sign.getRing().map(r => r.serialize()),
      sign.getResponses(),
      sign.getChallenge(),
      sign.getKeyImage(),
      sign.getLinkabilityFlag(),
      sign.verify(true).evmWitnesses as bigint[]
    );
  };

  if (!topicData) {
    return <Typography sx={{ padding: 2 }}>Loading...</Typography>;
  }
  const totalVotes = Number(topicData.voteFor) + Number(topicData.voteAgainst);
  const voteForPercentage = totalVotes ? (Number(topicData.voteFor) / totalVotes) * 100 : 0;
  const voteAgainstPercentage = totalVotes ? (Number(topicData.voteAgainst) / totalVotes) * 100 : 0;

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 2 }}>
      <Card raised sx={{ mt: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {topicData.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {new Date(topicData.date).toLocaleDateString()}
          </Typography>
          <Typography 
            variant="body1" 
            color="text.primary" 
            paragraph 
            sx={{
              border: '1px solid black',
              padding: '8px',
              textAlign: 'justify',  // Justify the text
              borderRadius: '4px'  // Optional: Adds rounded corners to the border
            }}
          >
            {topicData.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {topicData.voteFor} votes for ({voteForPercentage.toFixed(0)}%)
          </Typography>
          <LinearProgress variant="determinate" value={voteForPercentage} sx={{ height: 10, borderRadius: 5 }} />
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 2 }}>
            {topicData.voteAgainst} votes against ({voteAgainstPercentage.toFixed(0)}%)
          </Typography>
          <LinearProgress variant="determinate" value={voteAgainstPercentage} color="secondary" sx={{ height: 10, borderRadius: 5 }} />
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              <Button 
                variant="contained" 
                style={{ backgroundColor: '#4CAF50', color: 'white' }}
                onClick={() => handleVote('true')}
              >
                Vote For
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                style={{ backgroundColor: '#F44336', color: 'white' }}
                onClick={() => handleVote('false')}
              >
                Vote Against
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Live Chat
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <i>Comming soon 🔜</i>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default TopicPage;
