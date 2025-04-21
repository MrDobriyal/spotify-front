'use client'
import Artist from "@/components/Artist";
import Songs from "@/components/Songs";
import { useEffect, useState } from 'react';
import api from '../lib/axios';


export default function Home() {
  const [audios, setAudios] = useState([]);
  const [artists,setArtists] =useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [CurrentSong,SetCurrentSong] = useState(null);
  
  useEffect(() => {
    api.get('/artist') 
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Artist:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedArtistId) {
      // Fetch audios for the selected artist
      api.get(`/artist/${selectedArtistId}`)
        .then((response) => {
          setAudios(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching song data for artist:', error);
        });
    } else {
      // Optionally, fetch all songs when no artist is selected
      api.get('/audios')
        .then((response) => {
          setAudios(response.data);
        })
        .catch((error) => {
          console.error('Error fetching all songs:', error);
        });
    }
  }, [selectedArtistId]);

    
  return (
   <>
     <div className="min-h-screen px-4 md:px-12 py-6">
      <Artist artists={artists} onSelectArtist={setSelectedArtistId} />
      <Songs audios={audios} />
    </div>
   </>
  );
}
