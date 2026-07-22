const { getAllmembers, gettingMember, addingMembers, updatingMembers, deletingMembers } =
    require("../models/membersModel")

const getMembers = (req, res) => {

    getAllmembers((err, results) => {

        if (err) {
            return res.status(500).json({ message: "database error" });
        }
        res.status(200).json(results);
    })
}

const getMembersid = (req, res) => {

    const id = Number(req.params.id)

    gettingMember(id, (err, results) => {

        if (err) {
            return res.status(500).json({ message: "database error" });
        }
        res.status(200).json(results);
    })
}

const addMembers = (req, res) => {

    const { name, email, phone } = req.body

    addingMembers(name, email, phone, (err, results) => {

        if (err) {
            return res.status(500).json({ message: "error in adding members" });
        }
        res.status(201).json(results);
    })
}

const updateMembers = (req, res) => {

    const id = Number(req.params.id)
    const { name, email, phone } = req.body

    updatingMembers(id, name, email, phone, (err, results) => {

        if (err) {
            return res.status(500).json({ message: "error in updating memebers" });
        }
        res.status(200).json(results);
    })
}

const deleteMembers = (req, res) => {

    const id = Number(req.params.id)

    deletingMembers(id, (err, results) => {

        if (err) {
            return res.status(500).json({ message: "error in deleting members" });
        }
        res.status(200).json(results);
    })

}


module.exports = { getMembers, getMembersid, addMembers, updateMembers, deleteMembers }
