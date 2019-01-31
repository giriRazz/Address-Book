const jwt = require('jsonwebtoken');
const config = require('config');
// function logged(req , res , next){
//    const token = req.header('x-login-token');
//    if(!token) return res.status(400).send('Access denied: no token is provided');
//    try{
//        const decoded =   jwt.verify(token , config.get('jwtPrivateKey'));
//        req.user = decoded;
//        next();
//    }
//    catch(ex){
//        res.status(400).send('Invalid Token....');
//    }
// }
// module.exports = logged;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(400).send('Access denied: no token is provided');
        const decodedToken = jwt.verify(token, "iloveyou");
        req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId

        };
        console.log('email: ', email);
        console.log('userId: ', userId);
        next();
    } catch (error) {
        res.status(400).send('Invalid Token....really', error);
    }


}