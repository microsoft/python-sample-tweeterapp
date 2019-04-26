To get started with running this application:
- make sure you have all the necessary react components installed from the package.json file.
- Use the command `npm run dev` to complie all of the react components
- activate virtual environment and use `python manage.py runserver` to run the app. 
- navigate to the local host to see the REACT rendering.

Current State as of 4/26 PR:
- at one point, I had the hot-reloading working, but now when I use the command `npm run start`, I get a big error message. However, 
  all of the necessary pieces for hot reloading are in the webpack.config.js file. Overall, not sure what is happening here now.
- Was working on getting the tweet typing/ tweet button functionality to work. It is currently at the point where a user's typing is being registered, and I even
  added a POST command to attempt to post the data to `api/tweets`, but was running into some function/object errors that I couldn't figure out.
