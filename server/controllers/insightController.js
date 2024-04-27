import { Insight } from "../models/insightModel.js";

export const getInsight = async (req, res, next) => {
  try {
    const { page, per_page } = req.query;
    const skip = (page - 1) * per_page;
    const insights = await Insight.find({})
      .skip(skip)
      .limit(per_page)
      .select(
        "title source topic insight sector region country added published"
      );
    return res.status(200).json({
      message: "Fetch Table data successfull",
      data: insights,
    });
  } catch (error) {
    next(error);
  }
};
export const getFilteredInsight = async (req, res, next) => {
  try {
    const filters = {};

    Object.keys(req.query).forEach((key) => {
      if (req.query[key] !== "") {
        filters[key] = req.query[key];
      }
    });

    const insights = await Insight.find(filters).select(
      "title source topic insight sector region country added published"
    );

    return res.status(200).json({
      message: "Fetch Table data successfull",
      data: insights,
    });
  } catch (error) {
    next(error);
  }
};

export const getGraphicData = async (req, res, next) => {
  try {
    const insights = await Insight.find({}).select(
      "start_year likelihood country intensity topic relevance sector relevance"
    );

    return res.status(200).json({
      message: "Fetch Graphic data successfull",
      data: insights,
    });
  } catch (error) {
    next(error);
  }
};
