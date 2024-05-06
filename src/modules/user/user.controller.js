const userSvc = require("./user.service");

class UserController {
  index = async (req, res, next) => {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 15;
      const skip = (page - 1) * limit;

      let filter = {};
      // filter
      if (req.query.search) {
        // ? search = filter
        filter = {
          name: new RegExp(req.query.search, "i"),
          email: new RegExp(req.query.search, "i")
        }
      }

      if (req.query.role) {
        // ? search = filter
        filter = {
          ...filter,
          role: req.query.role

        }
      }

      const data = await userSvc.listAll({
        limit: limit,
        skip: skip,
        filter: filter,
      });
      const countData = await userSvc.count({
        filter: filter
      });
      res.json({
        result: data,
        message: "User list",
        meta: {
          limit: limit,
          page: page,
          total: countData,
        }
      })
    } catch (exception) {
      next(exception);
    }
  };
}

const userCtrl = new UserController();
module.exports = userCtrl;
