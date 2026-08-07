const { getAllmembers, gettingMember, addingMembers, updatingMembers, deletingMembers, getTotalMembers } =
    require("../models/membersModel")

const getMembers = (req, res, next) => {

    const name = req.query.name

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    getAllmembers(name, limit, offset, (err, results) => {

        if (err) {
            return next(err);
        }

        getTotalMembers(name, (err, totalResult) => {
            if (err) return next(err);

            const totalMembers = totalResult[0].total;
            const totalPages = Math.ceil(totalMembers / limit);

            res.status(200).json({
                success: true,
                message: "Members fetched successfully",
                data: results,
                currentPage: page,
                totalMembers,
                totalPages
            });
        });
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

        res.status(200).json({
            success: true,
            message: "Member fetched successfully",
            data: results[0]
        });
    })
}

const addMembers = (req, res, next) => {

    const { name, email, phone } = req.body

    addingMembers(name, email, phone, (err, results) => {

        if (err) {
            return next(err);
        }

        res.status(201).json({
            success: true,
            message: "Member added successfully"
        })
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

        res.status(200).json({
            success: true,
            message: "Member updated successfully"
        });
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

        res.status(200).json({
            success: true,
            message: "Member deleted successfully"
        });
    })

}


module.exports = { getMembers, getMembersid, addMembers, updateMembers, deleteMembers }
