const { User, Thought } = require('../models'); 

const thoughtController= {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ id: -1 })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400)
      })
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ id: params.id })
      .populate({
        path: 'reaction',
        select: '-__v'
      })
      .select('-__v')
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createThought({ body }, res) {
    Thought.create(body)
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ id: params.id }, body, { new: true, runValidators: true })
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thoughtData);
    })
    .catch(err => res.json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ id: params.id }) 
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.json(err))
  }
}

module.exports = thoughtController;