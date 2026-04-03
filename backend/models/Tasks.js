import mongoose from 'mongoose';

const tasksSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "done"],
            default: "pending",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

    },
    { timestamps: true }
);

const Tasks = mongoose.model('Tasks', tasksSchema);

export default Tasks;