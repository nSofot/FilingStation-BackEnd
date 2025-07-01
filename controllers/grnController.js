import Grn from "../models/grn.js";
import { isAdmin } from "./userController.js";


export async function addGrn(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "You are not authorized to add GRN"
    });
  }

  let trxId = "GRN-000001";

  try {
    const lastGrn = await Grn.find().sort({ createdAt: -1 }).limit(1);
    if (lastGrn.length > 0) {
      const lastId = parseInt(lastGrn[0].trxId.replace("GRN-", ""));
      trxId = "GRN-" + String(lastId + 1).padStart(6, "0");
    }
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch last GRN",
      error: err.message
    });
  }

  req.body.trxId = trxId;
  req.body.createdAt = new Date();

  const grn = new Grn(req.body);

  grn
    .save()
    .then(() => {
      res.status(200).json({
        message: "GRN added"
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "GRN not added",
        error: err.message
      });
    });
}


export async function getGrn(req, res) {
    try {
        const grn = await Grn.find();
        res.json(grn);
    } catch (err) {
        res.status(500).json({
            message: "Error getting GRN",
            error: err
        });
    }   
}


export async function getGrnProducts(req, res) {
    const { productId } = req.query;

    try {
        let grn;

        if (productId) {
            grn = await Grn.find({
                itemDetails: {
                    $elemMatch: { productId }
                }
            });
        } else {
            grn = await Grn.find();
        }

        res.json(grn);
    } catch (err) {
        res.status(500).json({
            message: "Error getting GRN",
            error: err
        });
    }
}


export async function deleteGrn(req, res) {
    if(!isAdmin(req))
    {
        res.status(403).json({
            message : "You are not authorized to delete GRN"
        })
        return
    } 

    try{
        await Grn.deleteOne({trxId : req.params.trxId})

        res.json({
            message : "GRN deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Failed to delete GRN",
            error: err
        })
    }
}