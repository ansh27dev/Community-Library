# Community Library

A 
platform/portal
that provides
access to a
diverse range of
reading material
by donating and
pooling used
books, so that
books need not to
be
discarded(wasted)
and will be used
in meaningful
way.

## Installation

Use the  npm package manager to install necessary dependencies.

```bash
git clone https://github.com/ansh27dev/Community-Library.git
cd server
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
