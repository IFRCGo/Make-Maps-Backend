# IFRC-GO-Make-Maps-Backend
The backend of the IFRC GO Make Maps System is built on GraphQL, ApolloServer, Express, and Mongoose. GraphQL is used to define the API schema, which allows for efficient querying of data. ApolloServer is used to implement the API and handle incoming requests. Express is used to create the server and route incoming requests to the appropriate handlers. Mongoose is used to interact with the MongoDB database, which stores all of the application's data.

In the future, the backend will use AzureAD for authentication. This will enable users to securely log in to the system and access resources based on their role and permissions. Overall, this backend architecture allows for efficient data management, flexible data querying, and secure access control for the IFRC GO Make Maps System.
## API Documentation
Find the API Documentation [here](/backend/documentation)

## Installation

Follow these steps to set up and run IFRC GO Make Maps Backend:

1. Clone the repository:

```bash
git clone https://github.com/IFRC-GO-Make-Maps/IFRC-GO-Make-Maps-Backend
```

2. Navigate to the project directory:

```bash
cd backend/
```

3. Install the dependencies:

```bash
yarn install
# OR
npm install
```

4. Create a .env file and set the environment variables

```dotenv
PORT=<"Enter your desired Port or by default 9092"> 
MONGO_URL=<REPLACE THIS WITH YOUR MONGODB URL>
```

5. Start the development server:

```bash
yarn start
# OR
npm start
```

Your application should now be running on http://localhost:9092.

## Demo

This is the demo for the project: https://www.youtube.com/watch?v=DSyl1Z1y9Pw

## Contact
If you have any questions or concerns, please reach out to:

- Piraveenan Kirupakaran (Team Leader): p.kirupakaran@ucl.ac.uk
- Tao Huang: tao.huang.22@ucl.ac.uk
- Yizhou Li: ucabiaz@ucl.ac.uk
- Jaden Wan: jaden.wan.22@ucl.ac.uk
- Yi-Hsin: yi-hsien.hsin.22@ucl.ac.uk
- Daniel Swarup: daniel.swarup.22@ucl.ac.uk

Project URL: https://ifrc-go-make-maps-backend.azurewebsites.net/

## Contributing

If you'd like to contribute to _IFRC GO Make Maps_, please follow these steps:

Fork the repository.
Create a new branch with a descriptive name (e.g., feature/awesome-feature).
Make your changes and commit them with a clear and concise commit message.
Push your changes to your forked repository.
Create a pull request and describe the changes you've made.