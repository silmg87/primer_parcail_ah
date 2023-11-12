import { votesCreateSchema } from "../schemas/votes.js";

export function validateCreateVotes(req, res, next) {
    votesCreateSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  })
    .then(async function (vote) {
      req.body = vote
      next()
    })
    .catch(function (err) {
      res.status(400).json(err)
    })

}