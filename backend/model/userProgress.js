import mongoose from "mongoose"

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true
  },
  sqlQuery: {
    type: String
  },
  lastAttempt: {
    type: Date,
    default: Date.now
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  attemptCount: {
    type: Number,
    default: 0
  }
});

// schema.index({ userId: 1, assignmentId: 1 }, { unique: true });

export const Progress = mongoose.model("Progress",schema)
