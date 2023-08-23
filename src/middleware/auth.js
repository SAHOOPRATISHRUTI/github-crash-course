const jwt = require('jsonwebtoken');


const authenticateAdmin = (req, res, next) => {
  let token = req.headers.authorization; // Assuming the token is sent in the "Authorization" header

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
    console.log(decoded);
    // Add the decoded token data to the request object for further processing
    req.admin = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: 'Invalid token' });
  }
};