const express = require('express')
const router = express.Router()
const members = require('../../Members')

router.get('/', (req, res) => res.json(members))

router.post('/', (req, res) => res.send(req.body))

router.get('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id))
	if(found){
		res.json(members.filter(member => member.id === parseInt(req.params.id)))
	}
	else{
		res.status(400).json({msg: `No member with id ${req.params.id} exists`})
	}
})

module.exports = router