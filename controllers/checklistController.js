const router = require('express').Router();
const {Checklist} = require('../models');
const validate = require('../middleware/validateSession');

router.get('/test', (req, res) => {res.send('checklist listening. checklistening')});

//CREATE A NEW CHECKLIST ITEM
router.post('/new', validate, (req, res) => {
    Checklist.create({
        title: req.body.title,
        isDone: req.body.isDone,
        userId: req.user.id,
    })
    .then(checklistItem => res.status(200).json({checklistItem}))
    .catch(err => res.status(500).json({message: 'checklist item creation failed', error: err}))
});

//UPDATE A CHECKLIST ITEM
router.put('/update/:id', validate, (req, res) => {
    Checklist.update(req.body, {where: {id: req.params.id, userId: req.user.id} })
    .then(checklistItem => res.status(200).json({message: `checklist Item ${req.params.id} updated.`, checklistItem}))
    .catch(err => res.status(500).json({message: 'checklist item update failed', error: err}))
})

//GET A LIST OF USER'S CHECKLIST ITEMS
router.get('/', validate, (req, res) => {
    Checklist.findAll({ where: {userId: req.user.id},
        include: ["user"]
    }).then(checklistItem => res.status(200).json({message: 'checklist items found', checklistItem}))
    .catch(err => res.status(500).json({message: 'checklist items not found', error: err}))
})

//DELETE A CHECKLIST ITEM
router.delete('/delete/:id', validate, (req, res) => {
    Checklist.destroy({where: {id: req.params.id, userId: req.user.id}})
    .then(checklistItem => res.status(200).json({message: 'checklist item deleted', checklistItem}))
    .catch(err => res.status(500).json({message:'checklist item not deleted', error: err}))
})

module.exports = router;