## Note:

In developing this app, I've integrated the SMS service provided by [Twillio](https://www.twilio.com) for seamless communication. When you sign in to Twilio, you'll receive both an **SID** and an **_AUTH TOKEN_**, which are essential for this app's functionality. Additionally, I've opted for [MongoDB Atlas](https://www.mongodb.com/atlas/database) as the database solution for efficient data management.

## Setup:

To get started with the Food Order App, follow these simple setup instructions:

1. Create a `.env` file at the root of the project directory.

2. In the `.env` file, assign values to the following variables:

   - `MONGODB_URI`: Your MongoDB Atlas connection URI.
   - `RefreshToken`: Your app's refresh token.
   - `AccessToken`: Your app's access token.
   - `TWILIO_ACCOUNT_SID`: Your Twilio Account SID.
   - `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token.

3. Open your terminal and run the command `npm install` to install the necessary dependencies.

4. Finally, start the app by running `npm start`.

With these steps completed, your Food Order App will be up and running, efficiently managing food orders and SMS notifications.
