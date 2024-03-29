const { isAdmin, isSuperAdmin } = require('../middlewares/access');
const { Router } = require('express');
const { body, header, param } = require('express-validator');
const { isValidAPI, isValidID } = require('../middlewares/shared');
const Controller = require('../controllers/unit');

const router = Router();
const UnitController = Controller();

router.get(
  '/',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
    header('authorization', 'Please specify an authorization header')
      .exists()
      .bail()
      .custom((value) => isAdmin(value)),
  ],
  UnitController.GetAllUnits
);

// Get unit by id
router.get(
  '/view/:id',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
    param('id', 'ID is required')
      .exists()
      .custom((value) => isValidID(value)),
    header('authorization', 'Please specify an authorization header')
      .exists()
      .bail()
      .custom((value) => isAdmin(value)),
  ],
  UnitController.ViewUnit
);

router.post(
  '/',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
    body('u_names', 'Unit name is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Unit name cannot be empty'),
    body('dept_id', 'Department ID is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Department ID cannot be empty'),
  ],
  UnitController.AddUnit
);

router.put(
  '/:id',
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
      .custom((value) => isValidID(value)),
    body('u_names', 'Unit name is required').optional().trim(),
    body('dept_id').optional().trim(),
  ],
  UnitController.UpdateUnit
);

router.delete(
  '/:id',
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
      .custom((value) => isValidID(value)),
  ],
  UnitController.DeleteUnit
);

module.exports = router;
