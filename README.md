# Community Library

A platform/portal that provides allows donating and pooling used books in local community library, so that books need not to be discarded(wasted) and will be borrowed and used in meaningful way, thereby fostering a vibrant and inclusive local community of readers.

- Through this initiative, individuals can easily browse the local library, donate their used books, and contribute to the collective pool of resources.
- An admin dashboard is provided for efficient management of the books, including issuing and returning them as needed.
- By promoting the values of sharing, collaboration, and community support, the platform strives to remove financial constraints and overcome barriers to learning and knowledge acquisition.
- Ultimately, it serves as a perfect way to utilize books to their maximum potential, conserve resources, save money, and cultivate a community of knowledge seekers and enthusiasts united in their quest for learning and personal growth.

## Tech stack

### backend:

- nodejs
- expressjs
- MongoDB

### Additional dependencies

- bcryptjs
- cookie-parser
- dotenv
- ejs
- express-session
- jsonwebtoken
- mongoose

### view rendering:

- EJS(Templating language for generating HTML markup)
- CSS for styling
- JS for additional dynamic features

### Reverse Geocoding API by Geoapify to get location using latitude and longitude

## Installation

Use the npm package manager to install necessary dependencies.

```bash
git clone https://github.com/ansh27dev/Community-Library.git
npm install
npm start

```

## Environment Variables

You can customize the environment variables in the following way.

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/MyCommunityLibrary
JWT_SECRET= mysecretkey

```

## Middleware

Custom middleware is used to validate the presence and integrity of JSON Web Tokens (JWTs) in incoming requests. what it does is:

- Verify the authenticity and validity of JWTs by decoding and verifying the digital signature using a secret key.
- Grant access to routes only if a valid JWT is present and represents an authenticated user.

## Authentication

Authentication is implemented using JWT.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
