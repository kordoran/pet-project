const config = {
  auth: {
    google: {
      client_id: process.env.CLIENT_ID_GOOGLE || "",
      client_secret: process.env.CLIENT_SECRET_GOOGLE || "",
      redirect_uri:
        process.env.CLIENT_REDIRECT_URI_GOOGLE ||
        "http://localhost:3000/callback",
      token_endpoint: "https://oauth2.googleapis.com/token",
      grant_type: "authorization_code",
      user_endpoint: null,
      user_id: null,
    },
  },
};

module.exports = config;
