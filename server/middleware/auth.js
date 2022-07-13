import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.header.authorization.split(' ')[1];
    const isCustomAuth = token < 500   //To check if it is a token from server not Google

    let decodedData;

    if (token && isCustomAuth) {
        decodedData = jwt.verify(token, 'memories');
        req.userId = decodedData?.id;
    } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
}

export default auth;