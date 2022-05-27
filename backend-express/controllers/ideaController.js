const ListIdeas = require('../models/idea')

module.exports.uploadIdeaList = async function(req, res){
    let {nameList, List} = req.body
    List = JSON.stringify(List)
    const idea = await ListIdeas.findOneAndUpdate(
        {nameList: nameList},
        {List},
        {new: true})
        .catch(err => console.log(err.message))
    if (idea === null){
        ListIdeas.create({nameList, List})
            .then((result) => {
            let mess = `${result.nameList} создан!`
            res.send({message: mess})})
            .catch(err => console.log(err.message))
    } else {
        let mess = `${nameList} обновлён!`
        res.send({message: mess})
        // console.log(mess)
    }
}
module.exports.downloadIdeaList = function(req, res){
    ListIdeas.findOne({nameList: req.body.nameList})
        .then(result =>
            res.send(result))
        .catch(err => console.log(err.message))
}