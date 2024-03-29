const { isValidObjectId } = require('../middlewares/shared');
const { isAdmin } = require('../middlewares/auth');
const { isValidAPI } = require('../middlewares/shared');
const { Router } = require('express');
const { body, header, param } = require('express-validator');
const { parser } = require('../../../functions/cloudinary');

const Controller = require('../controllers/announcement');

const router = Router();
const AnnouncementController = Controller();

router.get(
  '/',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
  ],
  AnnouncementController.GetAllAnnouncements
);

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
    parser.single('image'),
    body('title', 'Title is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Title cannot be empty'),
    body('priority', 'Priority is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Priority cannot be empty')
      .toInt(),
    body('details').trim().optional(),
  ],
  AnnouncementController.AddAnnouncement
);

router.patch(
  '/:id',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
    header('authorization', 'Please specify an authorization header')
      .exists()
      .bail()
      .custom((value) => isAdmin(value)),
    parser.single('image'),

    param('id', 'ID is required')
      .exists()
      .custom((value) => isValidObjectId(value)),
    body('title', 'Title is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Title cannot be empty'),
    body('priority', 'Priority is required')
      .trim()
      .exists()
      .notEmpty()
      .withMessage('Priority cannot be empty')
      .toInt(),
    body('details').trim(),
  ],
  AnnouncementController.UpdateAnnouncement
);

// Get announcement by id
router.get(
  '/:id',
  [
    header('x-api-key', 'API Access Denied')
      .exists()
      .bail()
      .custom((value) => isValidAPI(value)),
    param('id', 'ID is required')
      .exists()
      .custom((value) => isValidObjectId(value)),
  ],
  AnnouncementController.ViewAnnouncement
);

// Delete announcement by id
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
      .custom((value) => isAdmin(value)),
    param('id', 'ID is required')
      .exists()
      .custom((value) => isValidObjectId(value)),
  ],
  AnnouncementController.DeleteAnnouncement
);

module.exports = router;
