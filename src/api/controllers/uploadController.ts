// TODO: create a controller to send the data of uploaded cat
// to the client
// data to send is described in UploadMessageResponse interface
import {Request, Response, NextFunction} from 'express';
import UploadMessageResponse from '../../interfaces/UploadMessageResponse';
import CustomError from '../../classes/CustomError';
import {Point} from 'geojson';

const catPost = async (
  req: Request,
  res: Response<{}, {coords: Point}>,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      const err = new CustomError('Something went wrong with the server', 500);
      throw err;
    }
    const message: UploadMessageResponse = {
      message: 'Cat uploaded',
      data: {
        filename: req.file.originalname,
        location: res.locals.coords,
      },
    };
    res.json(message);
  } catch (error) {
    next(new CustomError('Something went wrong with the server', 500));
  }
};

export {catPost};
