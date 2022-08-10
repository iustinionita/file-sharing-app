## File Sharing App

This app is using a backend `NodeJS` server to store the files and serve them on request using `Express` and `SocketIO`. The server files can be found [HERE](https://github.com/iustinionita/file-sharing-server "in this repo").

------------


#### How does it work?

Once you open the main page, a random 15 characters share code will be generated for you. This share code will be then used to generate the download link. You can find it at the top of the upload box.

------------



##### Upload page
Select your files within the limits shown in the upload box and wait for the app to upload them to the server. During the upload progress, you should see how many files have been uploaded out of the total number of files. If one or more of your files are not within the requirements, there is an "Error" counter that will show you how many files have been rejected.
At the end of the upload process, a download link will be generated. You can use the "Copy" icon to copy the link. 

------------



##### Download page
This page will filter the files from the server by the share code from the URL. Every file has its own "Download" button and an icon that represent the file type. If the file type is not supported, a generic icon will be displayed.

------------



#### Features I've considered while building the project

- `Random generated share code`: I prefer this method over used input share code to avoid file conflicts

- `File upload limitation in terms of size and number of files per upload`: This will prevent large files upload. I'm currently using a VPS hosting service with limited hardware resources, however you can edit the file size limit and number of files per upload as needed.

- `Files icons`: This app will recognize most of the files extension and display an appropriate icon for each of them. If the file extension is not recognized, a generic icon will be displayed.