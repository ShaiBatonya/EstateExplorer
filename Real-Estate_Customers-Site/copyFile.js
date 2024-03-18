import fs from 'fs'
const sourcePath = './dist/index.html'; // Path to the source file within the 'dist' folder
const destinationPath = './dist/404.html'; // Path to the destination file within the 'dist' folder

fs.copyFile(sourcePath, destinationPath, (err) => {
  if (err) {
    console.error('Error copying file:', err);
  } else {
    console.log('File copied successfully!');
  }
});
