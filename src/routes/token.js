import jwt from 'jsonwebtoken';
import HTTPError from 'http-errors';
import {Router} from 'express';
import config from '../config';
import {authenticationLogger as log} from '../log';
import {User} from '../models';

const router = new Router();

router.post('/', async (req, res, next) => {
    // Must include password here otherwise comparePassword has nothing to compare it to.
    const user = await User.findOne({username: req.body.username}).select('+password').exec().catch(err => next(err));
    if (user) {
        const now = Date.now();
        const isMatch = await user.comparePassword(req.body.password).catch(next);

        if (!isMatch) {
            return next(new HTTPError.Forbidden(`The username and/or password you provided don't match any current user.`));
        }

        await user.active();

        log.debug('Trying to sign JWT.');
        jwt.sign({
            username: user.username,
            roles: user.roles,
            iat: Math.floor(now / 1000) - 5, // Set issue date 5 seconds ago
            iss: 'https://api.twistly.xyz',
            aud: 'https://api.twistly.xyz',
            maxAge: 3600
        }, config.get('jwt.secret'), {
            expiresIn: 3600
        }, (err, token) => {
            if (err) {
                return next(err);
            }
            log.debug('Sending JWT.');
            return res.status(201).send({
                token
            });
        });
    } else {
        return next(new HTTPError.Forbidden(`The username and/or password you provided don't match any current user.`));
    }
});

export default router;
