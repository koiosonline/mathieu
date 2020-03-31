//console.log(`In ${window.location.href} starting script: ${import.meta.url}`);
import {GetYouTubePlaylists as getYouTubePlaylists, GetYouTubePlayListItems as getYouTubePlayListVideos} from './koios_youtube.mjs';


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

export async function uploadToIpfs()
{

}
