import CompanyList from "../models/company.js";
import bcrypt from "bcrypt";

export const createCompany = async function (req, res, next) {
  const Company = await CompanyList.findOne({ Email: req.body.Email });
  if (Company) return next(createError(403, "Already Exists!"));

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

    const newCompany = new CompanyList({
      Email: req.body.Email,
      Password: hash,
    });

    await newCompany.save();
    res.status(200).send("Created Successfully!");
  } catch (err) {}
};
