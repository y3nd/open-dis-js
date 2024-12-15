import { existsSync, lstatSync, readdirSync, unlinkSync, rmdirSync } from 'node:fs';

function deleteFolderRecursive(path) {
  if (existsSync(path) && lstatSync(path).isDirectory()) {
    readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;

      if (lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        unlinkSync(curPath);
      }
    });

    console.log(`Deleting directory "${path}"...`);
    rmdirSync(path);
  }
};

console.log("Cleaning working tree...");

deleteFolderRecursive("./dist");

console.log("Successfully cleaned working tree!");