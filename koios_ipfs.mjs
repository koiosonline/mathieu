//console.log(`In ${window.location.href} starting script: ${import.meta.url}`);
import {forIPFSexport} from './koios_youtube.mjs';
import {loadScriptAsync} from './koios_util.mjs';


export async function setupIPFS() {
  console.log("In SetupIPFS");
  await Promise.all( [ // see https://www.npmjs.com/package/ipfs
      loadScriptAsync("https://unpkg.com/ipfs/dist/index.js"),
      ]);
   console.log("Ipfs libraries loaded");
   var ipfs = await window.Ipfs.create(); //await??
   return ipfs;
}

export async function uploadToIpfs()
{
  var ipfs = await setupIPFS();
  var hash;                   //IPFS hash
  for await (const result of ipfs.add(JSON.stringify(await forIPFSexport())))
  {
    console.log(result);
    hash = result.path;
  }
  return hash;
}

export async function getInfoIpfs(hash)
{
  var ipfs = await setupIPFS();
  var videoAndPlaylistInfo;
  for await (const result of ipfs.cat(hash))
  {
    //console.log(JSON.parse(result.toString('utf8')));
    videoAndPlaylistInfo = JSON.parse(result.toString('utf8'));
  }
  return videoAndPlaylistInfo;
}
