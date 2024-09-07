const asyncHandler = require("express-async-handler");
const { ObjectId } = require('mongodb');

/**@import document model */
const Document = require("../models/Documents");

/**
 * @description create document
 * @api api/v1/documents
 * @access public
 * @type POST
 */

const createDocument = asyncHandler(async (req, res) => {
    const { title, invited_users } = req.body;

    try {
        /**@check if document exists*/
        const documentExist = await Document.findOne({ title });
        if (documentExist) {
            res.status(409).json({
                success: false,
                message: "Document already exists",
            });
        } else {
            /**@create document*/
            const document = await Document.create({
                title,
                invited_users,
                created_by: req.userData.id,
            });

            if (document) {
                res.status(201).json({
                    success: true,
                    message: "Document created successfully",
                    data: document,
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
 * @description  document list
 * @api api/v1/documents
 * @access private
 * @type GET
 */
const getDocument = asyncHandler(async (req, res) => {
    /**@defining total @page per request, @limit and @search */
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 8;
    const search = req.query.search || "";



    try {
        const documents = await Document.aggregate([
            {
                $match: {
                    title: { $regex: search, $options: "i" },
                    $or: [{ created_by: ObjectId(req.userData.id) },
                    { invited_users: { $in: [ObjectId(req.userData.id)] } }],
                    is_deleted: false,
                }
            }
            ,
            {
                $lookup: {
                    from: "users",
                    localField: "invited_users",
                    foreignField: "_id",
                    as: "collaborator\'s"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "created_by",
                    foreignField: "_id",
                    as: "owner"
                }
            },
            {
                $addFields: {
                    "collaboratorsFullName": {
                        $map: {
                            input: "$collaborator's",
                            as: "collaborator",
                            in: {
                                $concat: ["$$collaborator.first_name", " ", "$$collaborator.last_name"]
                            }
                        }
                    },
                    "ownersFullName": {
                        $map: {
                            input: "$owner",
                            as: "owner",
                            in: {
                                $concat: ["$$owner.first_name", " ", "$$owner.last_name"]
                            }
                        }
                    }
                }
            }, {
                $project: {
                    "collaborator\'s": 0,
                    owner: 0
                }
            }
        ])
            .skip(page * limit)
            .limit(limit);

        /**@counter for total number of @documents */
        const total = await Document.countDocuments({
            title: { $regex: search, $options: "i" },
            is_deleted: false,
        });

        res.status(200).json({
            success: true,
            data: documents,
            total,
        });
    } catch (e) {
        throw new Error(e);
    }
});

/**
 * @description update document
 * @api api/v1/documents
 * @access private
 * @type PATCH
 */
const updateDocument = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { title, pinned, user } = req.body;

    try {
        const document = await Document.findById({ _id: id });
        const documentNotExist = (await document.is_deleted) === true;
        if (documentNotExist) {
            res.status(400);
            throw new Error("Document not found");
        } else {
            const updateData = {
                title,
                pinned,
                user,
                updated_by: req.userData.id,
            };

            const updatedDocument = await Document.findByIdAndUpdate(id, updateData, {
                new: true,
            });
            if (updatedDocument) {
                res.status(201).json({
                    success: true,
                    message: "Document updated successfully",
                    data: updatedDocument,
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
 * @description delete document
 * @api api/v1/documents
 * @access private
 * @type PATCH
 */
const deleteDocument = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const is_deleted = {
            is_deleted: true,
        };

        const document = await Document.findById({ _id: id });
        const documentNotExist = (await document.is_deleted) === true;
        if (documentNotExist) {
            res.status(400);
            throw new Error("Document not found");
        } else {
            const deletedDocument = await Document.findByIdAndUpdate(id, is_deleted);
            if (deletedDocument) {
                res.status(201).json({
                    success: true,
                    message: "Document deleted successfully",
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid  data",
                });
            }
        }
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = {
    createDocument,
    getDocument,
    updateDocument,
    deleteDocument,
};
