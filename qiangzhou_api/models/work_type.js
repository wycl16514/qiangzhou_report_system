const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema(
    {
        kind: { type: String, required: true, trim: true, },
        projects: { type: String },
        types: { type: String, required: true, enum: ["初训", "复训", "初训,复训"] },
    }
)

const WorkType = mongoose.model('work_type', schema);
module.exports = WorkType;