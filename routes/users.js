const router = require('express-promise-router')();

const UserController = require('../controllers/users');

const { validateParam, validateBody, schema } = require('../helper/routerHelpers');


router.route('/')
    .get(UserController.index)
    .post(validateBody(schema.userSchema), UserController.newUser);

router.route('/:userId')
    .get(validateParam(schema.idSchema, 'userId'), UserController.getUser)
    .put([
        validateParam(schema.idSchema, 'userId'),
        validateBody(schema.userSchema)
    ], UserController.replaceUser)
    .patch([
        validateParam(schema.idSchema, 'userId'),
        validateBody(schema.userOptionalSchema)
    ], UserController.updateUser);

router.route('/:userId/cars')
    .get(validateParam(schema.idSchema, 'userId'), UserController.getUserCars)
    .post([
        validateParam(schema.idSchema, 'userId'),
        validateBody(schema.carSchema)
    ], UserController.newUserCar);

module.exports = router;