import express from "express";
import majorRequirementsHandler from "./major.requirements.handler.js";

const router = express.Router();

router.get("/major/requirements", async function (req, res, next) {
  try {
    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    }
    const major = await majorRequirementsHandler.getMajorRequirements({
      filters,
    });
    let response;
    if (major) {
      response = {
        majorName: major.name,
        majorCode: major.code,
        majorComponentFamilies: major.component_families,
      };
    } else {
      response = {};
    }
    res.json(response);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
