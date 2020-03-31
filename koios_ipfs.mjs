<<<<<<< HEAD
/*jshint esversion: 8, maxstatements:15, maxparams:3, maxdepth:3, maxcomplexity:5*/

console.log(`In ${window.location.href} starting script: ${import.meta.url}`);
import {getYouTubePlaylists,getYouTubePlayListVideos} from './koios_youtube.mjs';
=======
//console.log(`In ${window.location.href} starting script: ${import.meta.url}`);
import {GetYouTubePlaylists as getYouTubePlaylists, GetYouTubePlayListItems as getYouTubePlayListVideos} from './koios_youtube.mjs';

>>>>>>> 3d9ecaa3c37cd4dcd6660551748f8cda4ec7a71d

/*
export class Ipfs
{
  constructor()
  {
  }

  getPlaylist()
  {
    return await getYouTubePlaylists();
  }

  async setPlaylist()
  {

  }

  async sendPlaylist()
  {

  }

  getPlaylistVideos()
  {
    this.playlistVideos = getYouTubePlayListVideos();
    return this.playlistVideos;
  }

  async setPlaylistVideoInfo()
  {

  }

  async sendPlaylistVideoInfo()
  {

  }
}
*/

var ipfspromise;

async function SetupIPFS() {
    console.log("In SetupIPFS");
    if (ipfspromise)//Check of ipfspromise al eerder geïnitialiseerd is.
        return ipfspromise;

    await Promise.all( [ // see https://www.npmjs.com/package/ipfs
       loadScriptAsync("https://unpkg.com/ipfs/dist/index.js"),
       ]
    );
   console.log("Ipfs libraries loaded");
   ipfspromise =  window.Ipfs.create(); //await??
   return ipfspromise;
}


export async function getPlaylist()
{
  return await getYouTubePlaylists();
}

export async function getPlaylistVideos()
{
  this.playlistVideos = getYouTubePlayListVideos();
  return this.playlistVideos;
}

export function hoi()
{
  console.log("hoi!");
}
