# Teamable-Application-Project
This is a demo project done in the IT beginners course from Techworld with Nana. <br>
Link to the course description: https://www.techworld-with-nana.com/it-beginners-course <br>
To keep the project up-to-date with the latest versions, libraries are updated periodically.

## ⚙️ Technologies Used
- HTML
- CSS
- Javascript
- Vue.js
- Node.js
- MongoDB
- Git

## Prerequisites

- Have NPM (Node Package Manager) installed on your computer.
- Have MongoDB Compass installed on your computer.

## 🧭 Steps to Reproduce to check this project on your computer

### 1. ✅ Clone the Github repository

```bash

git clone https://github.com/JuanMiguelVC/Teamable-Application-Project.git

```

Remove the .git folder of the cloned repository to avoid committing to the repository. To check how the application works, removing the .git folder of the cloned repository is useful to avoid pushing code changes to the repository and your clone of the repository is saved on your local computer
To remove the .git folder, perform the following command
```bash
rm -rf .git
```
In case that you do have a Windows OS computer, do the following: Go to the folder, click on **view**, it would show all the options, go to the **show** tab, and click the option see hidden elements. Once the .git folder is visible, click on it and use the key combination **shift** plus **delete** to remove the .git folder from the locally cloned repository

### 2. 💻 Create a MongoDB database and collect it.
On your local MongoDB Compass, create the database **company_db**. On the **company_db** database, create a collection named **employees** to save the data of the application.

### 3. 📚 Install the libraries locally

The repository already has the package.json and the package-lock.json files. You can install the libraries on your local machine using the following command:

```bash
npm install
```

### 4. 👟 Run the application.

Before running the application, it is necessary to execute the commands indicated below.<br>
First, the command to execute is to serve the application.

```bash

npm run serve

```

After executing the serve command, it is time to build the project.

```bash

npm run build

```

After building the project, execute the command below.

```bash

npm run start

```

Or this command

```bash

node server.js

```

The application runs on port 3000.

### 5. 💻 Check the application
On your web browser, type the following: localhost:3000 to see the application running.<br> Also, you can edit the information by clicking on the Edit Profile button. Once you have finished editing the information or checked the values shown on the browser, click on the Update Profile button to save the changes. The changes will be saved on the MongoDB database be shown on the browser.

## 📌 Other useful NPM (Node Package Manager) commands

### To run the tests, execute the following command:

```bash
npm run test
```

### To package the application, execute the following command:

```bash
npm pack
```

### To update the application libraries, execute the following command:
```bash
npm update
```  