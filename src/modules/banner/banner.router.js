const allowRole = require("../../middleware/rbac.middleware");
const { setPath ,uploader} = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validate.middleware");
const { BannerCreateDTO ,BannerUpdateDTO} = require("./banner.dto");
const bannerCtrl = require("./banner.controller");
const auth = require("../../middleware/auth.middleware")

const router =  require("express").Router()


router.route('/')
    .post(
        auth,
        allowRole('admin'),
        setPath('banners'),
        uploader.single('image'),
        bodyValidator(BannerCreateDTO),
        bannerCtrl.create
    )
    
    .get(
        auth,
        allowRole("admin"),
        bannerCtrl.index
    );
    router.route("/:id")
    .get(
        auth,
        allowRole ("admin"),
        bannerCtrl.show
    )
    .put(
        auth,
        allowRole('admin'),
        setPath('banners'),
        uploader.single('image'),
        bodyValidator(BannerUpdateDTO,['image']),
        bannerCtrl.update

    )
    .delete(
        auth,
        allowRole('admin'),
        bannerCtrl.delete
    )


module.exports = router;