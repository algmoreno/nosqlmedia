const { User, Thought, Reaction } = require('../models'); 

const reactionController = {
  deleteReaction({ params }, res) {
    Reaction.findOneAndDelete({ id: params.id }) 
      .then(reactionData => res.json(reactionData))
      .catch(err => res.json(err))
  }
}