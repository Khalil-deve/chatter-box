import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function () { return this.isGroup; }, // only required for group chats
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  avatar: String,
}, { timestamps: true });

export default mongoose.models.Chat || mongoose.model('Chat', chatSchema);
