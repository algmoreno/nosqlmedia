const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  }
)

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: [1, 'Must be longer than one character!'],
      max: [280, 'Must be under 280 characters!']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;