const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // try {
    //     const token = req.headers.authorization.split(" ")[1];
    //     const decoded = jwt.verify(token, process.env.JWT_KEY);
    //     req.userData = decoded;
    //     next();
    // } catch (error) {
    //     return res.status(401).json({
    //         message: 'Auth failed'
    //     });
    // }

    // try {
    //     const token = req.cookies.jwt;
    //     jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
    //         if (err) {
    //             return res.status(401).json({
    //                 message: 'Auth failed',
    //                 error:err,
    //                 token:token
    //             });
    //         }
    //         console.log(decodedToken);
    //         next();
    //     });
    // } catch (error) {
    //     return res.status(401).json({
    //         message: 'Auth failed'
    //     });
    // }
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({
                    error: err
                });
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.status(401).json({
            message: 'Auth failed 2'
        });
    }



};