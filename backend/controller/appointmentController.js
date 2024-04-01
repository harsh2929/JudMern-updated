import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { FileCase } from "../models/FileCaseSchema.js";
import { User } from "../models/userSchema.js";

export const postFileCase = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    FileCase_date,
    department,
    judge_firstName,
    judge_lastName,
    hasVisited,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !FileCase_date ||
    !department ||
    !judge_firstName ||
    !judge_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isConflict = await User.find({
    firstName: judge_firstName,
    lastName: judge_lastName,
    role: "judge",
    judgeDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("judge not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "judges Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const judgeId = isConflict[0]._id;
  const litigantId = req.user._id;
  const FileCase = await FileCase.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    FileCase_date,
    department,
    judge: {
      firstName: judge_firstName,
      lastName: judge_lastName,
    },
    hasVisited,
    address,
    judgeId,
    litigantId,
  });
  res.status(200).json({
    success: true,
    FileCase,
    message: "FileCase Send!",
  });
});

export const getAllFileCases = catchAsyncErrors(async (req, res, next) => {
  const FileCases = await FileCase.find();
  res.status(200).json({
    success: true,
    FileCases,
  });
});
export const updateFileCaseStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let FileCase = await FileCase.findById(id);
    if (!FileCase) {
      return next(new ErrorHandler("FileCase not found!", 404));
    }
    FileCase = await FileCase.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "FileCase Status Updated!",
    });
  }
);
export const deleteFileCase = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const FileCase = await FileCase.findById(id);
  if (!FileCase) {
    return next(new ErrorHandler("FileCase Not Found!", 404));
  }
  await FileCase.deleteOne();
  res.status(200).json({
    success: true,
    message: "FileCase Deleted!",
  });
});
