function ErrorHandeler(err, req, res, next) {
  if (err.name === "UnauthenticatedUser") {
    return res.status(401).json({ message: "Error: Unauthenticated User" });
  }
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ message: "Error: Validation Error", error: err.message });
  }
  return res.status(500).json({ message: "Internal Server Error" });
}

const  RequestHandeller=
  ("*",
  (req, res, next) => {
    res
      .status(404)
      .json({ message: `You Can Not access this request ${req.originalUrl}` });
  });
module.exports = {ErrorHandeler, RequestHandeller}
