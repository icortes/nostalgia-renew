import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ChangeEvent, FormEvent, useState } from 'react';
import ResponsiveAppBar from '../components/AppBar';
import MediaCard from '../components/MediaCard';

const initialSearch = 2022;
const initialMedia = 'All';

function Home(props: any) {
  const [search, setSearch] = useState<Number>(initialSearch);
  const [media, setMedia] = useState<String>(initialMedia);

  const options = [
    { mediaType: 'All' },
    { mediaType: 'Movies' },
    { mediaType: 'TV' },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      search,
      media,
    });
  };

  const handleMediaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMedia(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    let year: number = Number(event.target.value);
    if (year.toString().length <= 4) {
      setSearch(year);
    }
  };

  return (
    <>
      <Head>
        <title>Nostalgia Generator</title>
        <meta name='description' content='Movie and TV Show Search' />
        <link rel='icon' href='/icon-pink.png' />
      </Head>

      <ResponsiveAppBar />

      <Container component={'main'} maxWidth='md'>
        <CssBaseline />

        <Box
          bgcolor={'white'}
          component={'form'}
          onSubmit={handleSubmit}
          noValidate
          sx={{ my: 4, px: 3 }}>
          <Grid container spacing={2} justifyContent={'center'}>
            <Grid item xs={12} sm={6}>
              <TextField
                type={'number'}
                margin='normal'
                required
                fullWidth
                id='search'
                name='search'
                label='Search Year (YYYY)'
                value={search}
                autoFocus
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='normal'
                id='select-media'
                select
                fullWidth
                required
                label={'Select Media Type'}
                value={media}
                onChange={handleMediaChange}>
                {options.map((option) => (
                  <MenuItem key={option.mediaType} value={option.mediaType}>
                    {option.mediaType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sx={{ mb: 1 }}>
              <Button type='submit' variant='contained' color='secondary'>
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>

        <MediaCard
          posterUrl={props.posterUrl}
          title={props.title}
          releaseDate={props.releaseDate}
          overview={props.overview}
        />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      posterUrl: '9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
      title: 'Doctor Strange in the Multiverse of Madness',
      releaseDate: '2022-05-04',
      overview:
        'Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.',
    },
  };
};

export default Home;
