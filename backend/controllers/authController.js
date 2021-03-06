const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// Register user => /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/kccvibpsuiusmwfepb3m",
      url: "https://res.cloudinary.com/shopit/image/uploadv1606305757/avatars/kccvibpsuiusmwfepb3m.png",
    },
  });

  //   const token = user.getJwtToken();

  //   res.status(201).json({
  //     success: true,
  //     token,
  //   });
  sendToken(user, 200, res);
});

// Login user => /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and passwrod", 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //   const token = user.getJwtToken();

  //   res.status(200).json({
  //     success: true,
  //     token,
  //   });
  sendToken(user, 200, res);
});
