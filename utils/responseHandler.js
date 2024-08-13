export const successResponse = (res, message, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const postResponse = (res, data, messageTitle) => {
  res.status(201).json({
    success: true,
    message: `${messageTitle || "Data"} created successfully`,
    data,
  });
};

export const getResponse = (res, data, messageTitle, pagination) => {
  res.status(200).json({
    success: true,
    message: `${messageTitle || "Data"} fetched successfully`,
    pagination,
    data,
  });
};

export const updateResponse = (res, data, messageTitle) => {
  res.status(200).json({
    success: true,
    message: `${messageTitle || "Data"} updated successfully`,
    data,
  });
};

export const deleteResponse = (res, data, messageTitle) => {
  res.status(200).json({
    success: true,
    message: `${messageTitle || "Data"} deleted successfully`,
    data,
  });
};

export const errorResponse = (res, message, statusCode = 500) => {
  res.status(statusCode).json({ success: false, message });
};

export const notFoundErrorResponse = (res, messageTitle) => {
  res
    .status(404)
    .json({ success: false, message: `${messageTitle || "Data"} not found!` });
};

export const conflictError = (res, messageTitle) => {
  res.status(409).json({
    success: false,
    message: `${messageTitle || "Data"} already exists!`,
  });
};

export const cookieResponse = (res, cookieName, data) => {
  res.cookie(cookieName, data, {
    maxAge: 10000000,
    // httpOnly: true, // If its true cookie is not accessible by client side JS
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });
};
