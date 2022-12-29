const { getLocaleConfig } = require('../services/getLocaleConfig');
const { getDepartments } = require('../services/getDepartments');
const { WebimError } = require('../errors/webim');

const localeController = async (req, res, next) => {
  try {
    const {
      responseData: { available_departments, lang },
    } = await getLocaleConfig();
    const departments = await getDepartments();
    const availableDepartments = departments.filter(el =>
      Object.keys(available_departments.options).includes(el.key)
    );

    res.json({
      departments: availableDepartments,
      languages: Object.keys(lang.options),
    });
  } catch (err) {
    next(new WebimError(err.message));
  }
};

module.exports = { localeController };
