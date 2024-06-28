import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation --not empty
  //check if user already exist: via username, email
  //check for images , check for avatar
  //upload them to cloduinary ,avatar
  //create user object --create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  //1-->>>
  const { fullname, email, username, password } = req.body;

  //2--->>
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //3--->>
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user with email or username already exist");
  }

  //4---->
  // const avatarLoacalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // if (!avatarLoacalPath) {
  //   throw new ApiError(400, "Avatar file is required");
  // }

  // const avatar = await uploadOnCloudinary(avatarLoacalPath);

  // const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // if (!avatar) {
  //   throw new ApiError(400, "Avatar not uplodeded");
  // }

  const user = await User.create({
    fullname,
    // avatar: avatar.url,
    // coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Sonething went wrong while registring the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registed succesfully"));
});

export { registerUser };