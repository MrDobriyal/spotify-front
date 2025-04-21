'use client'
import React from 'react'
import {useState,useEffect} from 'react'
import Playlist from '@/components/Playlist'
import Songs from '@/components/Songs'
import api from '@/lib/axios'

export default function page() {
  const [playlist,setPlaylist]=useState([]);
  const [audios,SetAudios]=useState([]);
  const [currentPlaylistId,selectedPlaylistId]=useState(null);

  useEffect(()=>{
    api.get('/playlists')
    .then((response)=>{
      setPlaylist(response.data);
      console.log(response.data);
    }).catch((err)=>{
      console.error(err);
    })
  },[])

  useEffect(()=>{
    if(currentPlaylistId){
      console.log(currentPlaylistId);
     api.get(`/playlists/${currentPlaylistId}/audios`)
     .then((response)=>{
      SetAudios(Object.values(response.data.audios));
      console.log(Object.values(response.data.audios));
     })
     .catch((err)=>{
      console.error(err);
     })
    }else{
      api.get('/audios')
      .then((response)=>{
        SetAudios(response.data)
      })
      .catch((err)=>{
        console.error(err);
      })
    }
  },[currentPlaylistId]);

  return (
    <>
     <div className="min-h-screen px-4 md:px-12 py-6">
      <Playlist Playlist={playlist} playlistId={selectedPlaylistId}/>
      <Songs audios={audios}/>
      </div>
    </>
  )
}
