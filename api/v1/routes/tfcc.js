const { isValidObjectId } = require('../middlewares/shared');
const { isAdmin, isSuperAdmin } = require('../middlewares/auth');
const { isValidAPI } = require('../middlewares/shared');
const { Router } = require('express');
const { body, header, param } = require('express-validator');

const Controller = require('../controllers/tfcc');
const { isValidZone } = require('../middlewares/tfcc');

const router = Router();
const CenterController = Controller();

// Get all TFCC centers
router.get(
  '/centers',
  [header('x-api-key', 'API Access Denied').exists().bail()],
  CenterController.GetAllCenters
);

// Get specific center
router.get(
  '/center/:id',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
    param('id', 'ID is required')
      .exists()
      .custom((value) => isValidObjectId(value)),
  ],
  CenterController.ViewCenter
);

// Add center
router.post(
  '/center',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
    header('authorization', 'Please specify an authorization header')
      .exists()
      .bail()
      .custom((value) => isAdmin(value)),
    body('cellLeader', 'Cell leader is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Cell leader cannot be empty'),

    body('phoneNumber', 'phoneNumber is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Phone number cannot be empty'),

    body('address', 'Address is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Address cannot be empty'),
    body('zone', 'zone is required')
      .trim()
      .exists()
      .custom((value) => isValidZone(value)),
  ],
  CenterController.AddCenter
);

// Update center
router.patch(
  '/center/:id',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
    header('authorization', 'Please specify an authorization header')
      .exists()
      .bail()
      .custom((value) => isAdmin(value)),
    param('id', 'ID is required')
      .exists()
      .custom((value) => isValidObjectId(value)),
    body('cellLeader', 'Cell leader is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Cell leader cannot be empty'),

    body('phoneNumber', 'phoneNumber is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Phone number cannot be empty'),

    body('address', 'Address is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Address cannot be empty'),
    body('zone', 'zone is required')
      .trim()
      .exists()
      .custom((value) => isValidZone(value)),
  ],
  CenterController.UpdateCenter
);

// Delete center by id
router.delete(
  '/center/:id',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
    header('authorization', 'Please specify an authorization header')
      .exists()
      .bail()
      .custom((value) => isSuperAdmin(value)),
    param('id', 'ID is required')
      .exists()
      .custom((value) => isValidObjectId(value)),
  ],
  CenterController.DeleteCenter
);

module.exports = router;
