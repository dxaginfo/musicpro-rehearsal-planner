import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { MusicNote, GroupAdd, Event, CheckCircle, Notifications } from '@mui/icons-material';

// Sample feature component
const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ mr: 1, color: 'primary.main' }}>{icon}</Box>
        <Typography variant="h6" component="h3">{title}</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
        {description}
      </Typography>
    </Paper>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>MusicPro Rehearsal Planner</title>
        <meta name="description" content="Efficiently manage music rehearsals, scheduling, and attendance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box 
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            py: 8,
            mb: 6,
            borderRadius: { xs: 0, sm: '0 0 2rem 2rem' },
            boxShadow: 3
          }}
        >
          <Container maxWidth="lg">
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              }}
            >
              MusicPro Rehearsal Planner
            </Typography>
            <Typography 
              variant="h5" 
              component="p"
              sx={{ 
                mb: 4, 
                maxWidth: '800px',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s',
              }}
            >
              A comprehensive solution for music groups to efficiently schedule rehearsals, 
              track attendance, and manage repertoire.
            </Typography>
            <Box 
              sx={{ 
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s',
              }}
            >
              <Button 
                variant="contained" 
                size="large" 
                sx={{ 
                  mr: 2, 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  }
                }}
              >
                Get Started
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'grey.300',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            Key Features
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<GroupAdd fontSize="large" />}
                title="Group Management"
                description="Create and manage musical groups, invite members, and assign roles for effective collaboration."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<Event fontSize="large" />}
                title="Smart Scheduling"
                description="Schedule rehearsals with intelligent conflict detection and optimal time suggestions."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<CheckCircle fontSize="large" />}
                title="Attendance Tracking"
                description="Track RSVPs, record attendance, and generate detailed reports for better accountability."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<MusicNote fontSize="large" />}
                title="Repertoire Management"
                description="Link rehearsals to specific pieces, track progress, and share practice materials."
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 8, mb: 6, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to streamline your rehearsals?
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              sx={{ mt: 2 }}
            >
              Join Now
            </Button>
          </Box>
        </Container>
      </main>

      <Box component="footer" sx={{ bgcolor: 'grey.100', py: 6, mt: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} MusicPro Rehearsal Planner
          </Typography>
        </Container>
      </Box>
    </>
  );
}