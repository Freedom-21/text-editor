const { signUp, getUser, getLoggedUser, login, updateUser, deleteUser } = require("./user.controller")
const { createDocument, getDocument, updateDocument, deleteDocument } = require("./document.controller")



module.exports = {
    signUp,
    login,
    getUser,
    getLoggedUser,
    updateUser,
    deleteUser,
    createDocument,
    getDocument,
    updateDocument,
    deleteDocument
}