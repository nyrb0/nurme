// src/VideoPlayer.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VideoPlayer = () => {
    useEffect(()=>{
        anime()
    },[])

    const anime = async()=>{
        try{
            const res = await axios.get('https://api.anilibria.tv/v3/title/schedule')
            console.log(res.data)
        }catch(e){
            console.log(e)
        }
    }

  return (
    <div>
        
    </div>
  );
};

export default VideoPlayer;
