const allowRole = require("../../middleware/rbac.middleware");
const { setPath ,uploader} = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validate.middleware");
const categoryCtrl = require("./category.controller");
const { CategoryCreateDTO ,CategoryUpdateDTO} = require("./category.dto");
const auth = require("../../middleware/auth.middleware")

const router =  require("express").Router()

router.get('/home-list',categoryCtrl.listForHome);
router.get('/:slug/detail',categoryCtrl.getCategoryBySlug);

router.route('/')
    .post(
        auth,
        allowRole('admin'),
        setPath('brands'),
        uploader.single('image'),
        bodyValidator(CategoryCreateDTO),
        categoryCtrl.create
    )
    
    .get(
        auth,
        allowRole("admin"),
        categoryCtrl.index
    );
    router.route("/:id")
    .get(
        auth,
        allowRole ("admin"),
        categoryCtrl.show
    )
    .put(
        auth,
        allowRole('admin'),
        setPath('brands'),
        uploader.single('image'),
        bodyValidator(CategoryUpdateDTO,['image']),
        categoryCtrl.update

    )
    .delete(
        auth,
        allowRole('admin'),
        categoryCtrl.delete
    )


module.exports = router;