const jwt = require("jsonwebtoken");
const { promisify } = require("util");
require("dotenv/config");

async function authorize(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ message: "Authorization token not provided" });
  }

  try {
    const decoded = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );

   req.id = decoded.id
   req.role = decoded.role;

    console.log(decoded);
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function restrictTo(...roles) {
  return (req,res,next) => {
    if (!roles.includes(req.role)) {
      res.status(403).json({ message: "sorry,You dont have permission" });
    }
    next();
  };
}

module.exports = { authorize,restrictTo};

// async function autho(req, res, next) {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     return res
//       .status(401)
//       .json({ message: "Unauthenticated, Please Login First" });
//   }

//   try {
//     const decoded = await promisify(jwt.verify)(
//       authorization,
//       process.env.JWT_SECRET
//     );
//     console.log(decoded);
//     req.id = decoded.data.id;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid Token" });
//   }
// }

// function authJWT() {
//   let secret = process.env.JWT_SECRET;
//   return expressJWT({
//     secret,
//     isRevoked: isRevoked,
//     algorithms: ["HS256"],
//   })
// }

// async function isRevoked(req, payload, done) {
//   if (!payload.isAdmin) {
//     done(null, true);
//   }
//   done();
// }
