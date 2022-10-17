/* eslint-disable  @typescript-eslint/no-explicit-any */
const errorHandler: (err: any) => string = (err: any) => {
  console.error(err);
  let msg = "Something wrong occured";
  if (err.response) msg = err.response.data?.message;
  else if (err.request) msg = err.request.data?.message;
  else msg = err.message;
  return msg;
};

export default errorHandler;
