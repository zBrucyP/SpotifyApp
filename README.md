# Your info... with data from Spotify

App deployed here: todo


## How to use this repo

### 1. Create a Spotify app
   - Go to [https://developer.spotify.com/](https://developer.spotify.com/)
   - Create an account or log in
   - Create an app
   - Set the app's redirect URI to: http://localhost:8888/callback
   - Know your client id, client secret, and redirect URI for the following steps


### 2. Launch the authorization server
   - Navigate to the root folder, install any dependencies with `npm install`
   - Navigate to auth-server with `cd auth-server`
   - Within app.js, set the following variables:
    - client_id = {your client id}
    - client_secret = {your client secret}
    - redirect_uri = {the redirect URI you set in the app settings}
   - In the auth-server directory, use `node app.js` to start the authorization server


### 3. Launch the client
   - Navigate to the src directory
   - Use `npm start` to automatically launch the react app in your browser


### 4. Using the app
   - Click login
    - You will be taken to Spotify's website where you will need to authorize the app to see your account info
   - See what the different app components can show about your account
