## Getting started

#### Step 1: Clone the repository

```bash
git clone https://github.com/SureshKannan5/Nestjs-crud.git
```

```bash
cd Nestjs-crud
```

#### Step 2: Create Your MongoDB Account and Database Cluster

- Create your own MongoDB account by visiting the MongoDB website and signing up for a new account.

- Create a new database or cluster by following the instructions provided in the MongoDB documentation. Remember to note down the "Add your connection string into your application code" under Cmd Line Tools section for the database, as you will need it later. Also, make sure to change `<password>` with your own password

- add your current IP address to the MongoDB database's IP whitelist to allow connections (this is needed whenever your ip changes)

#### Step 3: Create Environment File

- Create a .env file in the /backend directory

  This file will store environment variables for the project to run.

#### Step 4: Edit and Update MongoDB URI

- Check a file named temp.env in the /backend directory.
  
- In the temp.env file, find the line that reads:

   `MONGO_URI="your-mongodb-uri"`
   `SERVER_PORT = 8080`

- Copy the two lines and paste into .env file. Replace "your-mongodb-uri" with the actual URI of your MongoDB database and replace 8080 with desired port if you want to run the server on the different port.

#### Step 5: Install Backend Dependencies

In your terminal, navigate to the /backend directory

```bash
cd backend
```

Run the following command to install the backend dependencies:

```bash
npm install
```

This command will install all the required packages specified in the package.json file.

#### Step 6: Run Setup Script

While still in the /backend directory of the project, execute the following command to run the setup script:

```bash
npm run setup
```

This will seed dummy task data into the database and ensure an initial view for the frontend allowing you to have data to work with in your frontend application.

#### Step 7: Run the Backend Server

In the same terminal, run the following command to start the backend server:

```bash
npm run start:dev
```

This command will start the backend server, and it will listen for incoming requests.

#### Step 8: Install Frontend Dependencies

Open a new terminal window , and run the following command to install the frontend dependencies:

```bash
cd frontend
```

```bash
npm install
```
#### Step 10: Create Environment File

- Create a .env file in the /frontend directory

  This file will store environment variables for the project to run.

#### Step 10: Edit and Update Sever URL

- Check a file named temp.env in the /frontend directory.
  
- In the temp.env file, find the line that reads:

   `VITE_BACKEND_SERVER = "http://localhost:8080"`

- Copy the line and paste into .env file. Replace "http://localhost:8080" with the actual backend server running address.

#### Step 12: Run the Frontend Server

After installing the frontend dependencies, run the following command in the same terminal to start the frontend server:

```bash
npm run dev
```

This command will start the frontend server, and you'll be able to access the website on localhost:5173 in your web browser.