// const AWS = require('aws-sdk');
// const fs = require('fs');

// // Update your AWS credentials and bucket name here
// const region = "ca-central-1";
// const accessKeyId = 'AKIARFXJAVOQ5KJGFTM2';
// const secretAccessKey = 'IpLkrt7DqbUFmX7g19tngbhytjQp3JThFRa1QtP9';
// const bucketName = 'ai-pics-cook-mate';

// // Configure AWS
// AWS.config.update({ region, accessKeyId, secretAccessKey });
// // const s3 = new AWS.S3();
// // const s3 = new AWS.S3({ endpoint: `s3.${region}.amazonaws.com` });

// const endpoint = new AWS.Endpoint(`s3.${region}.amazonaws.com`);
// const s3 = new AWS.S3({ endpoint });
// // Function to upload a JPEG image to S3
// function uploadJPEGToS3(fileName, filePath) {
//   // Read the image file
//   console.log("start upload to bucket");
//   const fileContent = fs.readFileSync(filePath);

//   // Set the S3 upload parameters
//   const params = {
//     Bucket: bucketName,
//     Key: fileName,
//     Body: fileContent,
//     ContentType: 'image/jpeg', // Specify the correct content type for JPEG images
//     ACL: 'public-read', // Change this to private if you want the file to be private
//   };

//   // Upload the image to S3
//   s3.upload(params, (err, data) => {
//     if (err) {
//       console.error('Error uploading image:', err);
//     } else {
//       console.log('Image uploaded successfully. Image URL:', data.Location);
//     }
//   });
// }

// // Usage example
// const imageFileName = 'example.jpg'; // Update with your desired filename
// const imagePath = './path/to/your/image.jpg'; // Update with the path to your JPEG image file

// // uploadJPEGToS3(imageFileName, imagePath);
// module.exports = { uploadJPEGToS3 }