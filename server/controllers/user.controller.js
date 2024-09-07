const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../constants/index");
const jwt = require("jsonwebtoken");

/**@import user model */
const User = require("../models/Users");

/**
 * @description user signup
 * @api api/v1/signup
 * @access public
 * @type POST
 */
const signUp = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        /**@check if user exists*/
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(409).json({
                success: false,
                message: "User already exists",
            });
        } else {
            /**@hash password*/
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            /**@create user*/
            const user = await User.create({
                first_name,
                last_name,
                email,
                password: hashPassword,
            });

            if (user) {
                res.status(201).json({
                    success: true,
                    message: "User signup successfully",
                    data: user,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid data",
                });
            }
        }
    } catch (e) {
        throw new Error(e);
    }
});

/**
 * @description user login
 * @api api/v1/login
 * @access public
 * @type POST
 */
const login = asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        /**@check if user exists*/
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Invalid credentials",
            });
        } else {
            let userInfo = {
                id: user._id,
                name: user.name,
                email: user.email,
            };
            if (user && (await bcrypt.compare(password, user.password))) {
                res.status(200).json({
                    success: true,
                    data: userInfo,
                    accessToken: generateToken(user._id),
                    message: "You are logged in successfully!!!",
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                });

            }
        }
    } catch (e) {
        throw new Error(e);
    }
});

/**
 * @description user list
 * @api api/v1/uses
 * @access private
 * @type GET
 */
const getUser = asyncHandler(async (req, res) => {
    /**@defining total @page per request, @limit and @search */
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    try {
        const users = await User.find({
            first_name: { $regex: search, $options: "i" },
            is_deleted: false,
        })
            .skip(page * limit)
            .limit(limit);

        /**@counter for total number of @documents */
        const total = await User.countDocuments({
            first_name: { $regex: search, $options: "i" },
            is_deleted: false,
        });

        res.status(200).json({
            success: true,
            data: users,
            total,
        });
    } catch (e) {
        throw new Error(e);
    }
});

/**
 * @description logged user data 
 * @api api/v1/uses/logged_user
 * @access private
 * @type GET
 */
const getLoggedUser = asyncHandler(async (req, res) => {


    try {
        const user = await User.findOne({
            _id: req.userData.id
        })


        res.status(200).json({
            success: true,
            data: user,

        });
    } catch (e) {
        throw new Error(e);
    }
});

/**
 * 
 * @description update user
 * @api api/v1/users
 * @access private
 * @type PATCH
 */
const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { first_name, last_name, email, password } = req.body;

    //Hash password
    let hashPassword;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        return (hashPassword = await bcrypt.hash(password, salt));
    }
    try {
        const user = await User.findById({ _id: id });
        const userNotExist = (await user.is_deleted) === true;
        if (userNotExist) {
            res.status(400);
            throw new Error("User not found");
        } else {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                {
                    first_name,
                    last_name,
                    email,
                    password: hashPassword,
                },
                {
                    new: true,
                }
            );
            if (updatedUser) {
                res.status(201).json({
                    success: true,
                    message: "User updated successfully",
                    data: updatedUser,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid data",
                });
            }
        }
    } catch (e) {
        throw new Error(e);
    }
});

/**
 * @description user deletion(soft deletion).
 * @api api/v1/users/
 * @access private
 * @type PATCH
 */
const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const isDeleted = {
            is_deleted: true,
        };

        const user = await User.findById({ _id: id });
        const userNotExist = (await user.is_deleted) === true;
        if (userNotExist) {
            res.status(400);
            throw new Error("User not found");
        } else {
            const deletedUser = await User.findByIdAndUpdate(id, isDeleted);
            if (deletedUser) {
                res.status(201).json({
                    success: true,
                    message: "User deleted successfully",
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid data",
                });
            }
        }
    } catch (e) {
        throw new Error(e);
    }
});

/**@generate JWT*/
const generateToken = (id) => {
    return jwt.sign({ id }, SECRET, {
        expiresIn: "1d",
    });
};

module.exports = {
    signUp,
    login,
    getUser,
    getLoggedUser,
    updateUser,
    deleteUser,
};
