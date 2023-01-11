import { getUserDetails } from './../../../functions/auth';
import { DevotionalType } from './../../../types/index';
import { getPaginationOptions } from './../../../utils/pagination';
import { validationResult } from 'express-validator';
import express from 'express'
import DevotionalModel from '../../../models/devotional.model';
import { getDateFilters } from '../../../functions/filters';
import { ObjectId } from 'mongodb'

export default () => {
  const GetAllDevotionals = async (req: express.Request<never, never, never, { page: number, limit: number, from: string, to: string }>, res: express.Response) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

      const paginationOptions = getPaginationOptions(req, { date: -1 })

      // find all devotionals

      const devotionalsData = await DevotionalModel.paginate(getDateFilters(req), paginationOptions);

      return res.status(200).json({
        message: "All Devotionals Retrieved",
        data: devotionalsData
      });

    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const AddDevotional = async (req: express.Request<never, never, DevotionalType>, res: express.Response) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

      const {
        date,
        title,
        text,
        mainText,
        content,
        confession,
        furtherReading,
        oneYearBibleReading,
        twoYearsBibleReading,
      } = req.body

      const userDetails = await getUserDetails(req as any)

      // Check if devotional exists for this date

      const existingDevotional = await DevotionalModel.findOne({ date: new Date(date) });
      if (existingDevotional) return res.status(401).json({ message: "Devotional for this date already exists" })

      const newDevotional = new DevotionalModel({
        date: new Date(date),
        title,
        text,
        mainText,
        content,
        confession,
        furtherReading,
        oneYearBibleReading,
        twoYearsBibleReading,
        createdBy: userDetails.fullname
      })

      await newDevotional.save()

      return res.status(200).json({
        message: "Devotional added successfully",
        devotional: newDevotional
      });

    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const ViewDevotional = async (req: express.Request<{ id: string }>, res: express.Response) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

      const { id } = req.params

      // find devotional

      const devotionalData = await DevotionalModel.findById(id)


      if (!devotionalData) return res.status(404).json({ message: "Devotional not found" })

      return res.status(200).json({
        message: "Devotional retrieved",
        devotional: devotionalData
      });

    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const GetDayDevotional = async (req: express.Request, res: express.Response) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });


      // Get today's date
      let todaysDate: string | Date = new Date();
      const offset = todaysDate.getTimezoneOffset() // this is to handle timezone differences
      todaysDate = new Date(todaysDate.getTime() - (offset * 60 * 1000))
      todaysDate = todaysDate.toISOString().split('T')[0]


      // find devotional

      const devotionalData = await DevotionalModel.findOne({
        date: {
          $gte: todaysDate,
          $lte: todaysDate
        }
      })


      if (!devotionalData) return res.status(404).json({ message: "Devotional not found" })

      return res.status(200).json({
        message: "Devotional retrieved",
        devotional: devotionalData
      });

    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const DeleteDevotional = async (req: express.Request<{ id: string }>, res: express.Response) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

      const { id } = req.params

      // find devotional

      const devotionalData = await DevotionalModel.findById(id)

      if (!devotionalData) return res.status(404).json({ message: "Devotional not found" })

      await DevotionalModel.findByIdAndDelete(id)

      return res.status(200).json({
        message: "Devotional deleted"
      });

    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  return {
    GetAllDevotionals,
    AddDevotional,
    ViewDevotional,
    GetDayDevotional,
    DeleteDevotional
  };
};
