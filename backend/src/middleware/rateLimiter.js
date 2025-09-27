//
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // If user is not logged in, skip limiting
    if (!req.user) {
      return next();
    }
    // Use user ID if available, otherwise fall back to IP
    const key = req.user ? `user:${req.user.id}` : `ip:${req.ip}`;
    const { success } = await ratelimit.limit(key);

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }

    next();
  } catch (error) {
    console.error("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
