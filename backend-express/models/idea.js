const { Schema, model } = require('mongoose')

const schemaIdea = new Schema({
    nameList: {
       type: String,
        required: true //без nameList модель не создастца
    },
    List: {
        type: JSON,
        required: true
    }
})

module.exports = model('ListIdeas', schemaIdea)