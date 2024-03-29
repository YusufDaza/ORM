const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//http://localhost:3001/api/categories/
router.get('/', async (req, res) =>{
  try{
    const categoryData = await Category.findAll({
      include: [{ model: Product } ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err); 
}
});

//http://localhost:3001/api/categories/1
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.ed, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No reader found with that id!' });
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http:localhost:3001/api/categories/3
router.post('/', async (req, res) =>{
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      category_name: req.body_name 

    },{
      where: {
        id: req.params.id, 
      },
    });

    if(!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/categories/2
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id, 
      },
    });

    if(!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
