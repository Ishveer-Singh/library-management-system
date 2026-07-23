const { getAllmembers, gettingMember, addingMembers, updatingMembers, deletingMembers } =
    require("../models/membersModel")

const getMembers = (req, res, next) => {

    getAllmembers((err, results) => {

        if (err) {
            return next(err);
        }
        res.status(200).json(results);
    })
}

const getMembersid = (req, res, next) => {

    const id = Number(req.params.id)

    gettingMember(id, (err, results) => {

        if (err) {
            return next(err);
        }

        if (results.length === 0) {
            const error = new Error("Member not found");
            error.status = 404;
            return next(error);
        }

        res.status(200).json(results);
    })
}

const addMembers = (req, res, next) => {

    const { name, email, phone } = req.body

    addingMembers(name, email, phone, (err, results) => {

        if (err) {
            return next(err);
        }

        res.status(201).json({message: "Member added successfully"})
    })
}

const updateMembers = (req, res, next) => {

    const id = Number(req.params.id)
    const { name, email, phone } = req.body

    updatingMembers(id, name, email, phone, (err, results) => {

        if (err) {
            return next(err);
        }

        if (results.affectedRows === 0) {
            const error = new Error("Member not found");
            error.status = 404;
            return next(error);
        }

        res.status(200).json({message: "Member updated successfully"});
    })
}

const deleteMembers = (req, res, next) => {

    const id = Number(req.params.id)

    deletingMembers(id, (err, results) => {

        if (err) {
            return next(err);
        }

        if (results.affectedRows === 0) {
            const error = new Error("Member not found");
            error.status = 404;
            return next(error);
        }

        res.status(200).json({message: "Member deleted successfully"});
    })

}


module.exports = { getMembers, getMembersid, addMembers, updateMembers, deleteMembers }
