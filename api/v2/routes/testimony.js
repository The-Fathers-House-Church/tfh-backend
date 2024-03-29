const { isValidID } = require('../middlewares/shared');
const { isAdmin, isSuperAdmin } = require('../middlewares/access');
const {
  isValidAPI,
  isValidSource,
  isValidStatus,
} = require('../middlewares/shared');

const { Router } = require('express');
const { body, header, param } = require('express-validator');

const Controller = require('../controllers/testimony');

const router = Router();
const TestimonyController = Controller();

router.post(
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
    body('status')
      .trim()
      .optional()
      .isIn(['pending', 'approved', 'declined', 'archived'])
      .withMessage(
        'Status must be one of pending, approved, declined or archived'
      ),
  ],
  TestimonyController.GetAllTestimonies
);

router.post(
  '/new',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),

    body('fullName', 'Full Name is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Full Name cannot be empty'),

    body('phoneNumber', 'phoneNumber is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Phone number cannot be empty'),

    body('content', 'Content is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Content cannot be empty'),
    body('source', 'source is required')
      .trim()
      .exists()
      .custom((value) => isValidSource(value)),
  ],
  TestimonyController.AddTestimony
);
router.patch(
  '/:id/change-status',
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
    body('status', 'Status is required')
      .trim()
      .exists()
      .custom((value) => isValidStatus(value)),
  ],
  TestimonyController.ChangeStatus
);

router.get(
  '/:id',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
    param('id', 'ID is required')
      .exists()
      .custom((value) => isValidID(value)),
  ],
  TestimonyController.ViewTestimony
);

router.post(
  '/approved',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
  ],
  TestimonyController.GetApprovedTestimonies
);

module.exports = router;
