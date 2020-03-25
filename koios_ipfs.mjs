/*jshint esversion: 8, maxstatements:15, maxparams:3, maxdepth:3, maxcomplexity:5*/

console.log(`In ${window.location.href} starting script: ${import.meta.url}`);
import {} from './koios_youtube.mjs';


export class Ipfs
{
  constructor()
  {
    this.playlist = getYouTubePlaylists();
    this.playlistVideos = getYouTubePlayListVideos();
  }

  getPlaylist()
  {

  }

  async setPlaylist()
  {

  }

  async sendPlaylist()
  {

  }

  getPlaylistVideos()
  {
    return this.playlistVideos;
  }

  async setPlaylistVideoInfo()
  {

  }

  async sendPlaylistVideoInfo()
  {

  }
}


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
