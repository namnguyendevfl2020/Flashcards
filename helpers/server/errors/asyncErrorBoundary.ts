import { Request, Response, NextFunction } from 'express';

function asyncErrorBoundary(delegate: any, defaultStatus?: any) {
	return (req: Request, res: Response, next: NextFunction) => {
	  Promise.resolve()
		.then(() => delegate(req, res, next))
		.catch((error = {}) => {
		  const { status = defaultStatus, message = error } = error;
		  next({
			status,
			message,
		  });
		});
	};
  }
  
export { asyncErrorBoundary };