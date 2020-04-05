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
  /*
  ipfs.add(forIPFSexport()).then((response) => {
    console.log(response);
    // CID of wrapping directory is returned last
    hash = response[response.length - 1].hash;
    console.log("upload-info-fromjs", hash);
    console.log(hash);
  }).catch((err) => {
    console.error(err);
  });
*/
  for await (const result of ipfs.add(JSON.stringify(await forIPFSexport())))
  {
    console.log(result);
  }

}

export async function getInfoIpfs(hash)
{
  var ipfs = await setupIPFS();

}

/*
uploadForm.addEventListener('submit', e => {      //create an EventListener to react on the submit button press
  e.preventDefault();                       //prevent the default action from firing

  //IPFS.add requires the files to be an object in array format
  var fileArr = [];
  var hash;                                 //IPFS Hash
  const files = document.querySelector('[type=file]').files;
  //querySelector selects first documentElement with type file. Selected files are now addressable.

  for (let i = 0; i < files.length; i++) {  //Puts files in the array and right format
    var file = files[i];
    var fileObj = {
      path: file.name,
      content: file
    };
    fileArr[i] = fileObj;
  }

  console.log(fileArr);

  //Options to wrap files in ipfs directory
  const options = {
    wrapWithDirectory: true,
    progress: (prog) => console.log(`received: ${prog}`)
  };

  ipfs.add(fileArr, options).then((response) => {
    console.log(response);
    // CID of wrapping directory is returned last
    hash = response[response.length - 1].hash;
    log("upload-info-fromjs", hash);
    console.log(hash);
  }).catch((err) => {
    console.error(err);
  });
  //saveToIpfsWithFilename(files);
});
*/
