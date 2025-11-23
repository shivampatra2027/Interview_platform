import {Report} from "../models/report.model.js"
import {success} from "../utils/response.js"
export const getMyReport = async(req,res,next)=>{
    try{
        const userId = req.user && req.user._id ? req.user._id : null;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User ID not found in request"
            });
        }

        const reports = await Report.find({
            user: userId
        }).populate("interview", "title position difficultyLevel status overallScore").sort({createdAt:-1});

        return res.status(200).json({
            success:true,
            message:"report is successfully generated!",
            data: reports
        });
    }catch(error){
        next(error);
    }
}

export const getReportById = async(req,res,next)=>{
    try{
        const {id}= req.params;
        const report = Report.findOne({_id:id,user:req.user._id}).populate("interview");
        if(!report){
            return res.status(404).json({
                success:false,
                message:"no report found!"
            });
        }
        return success(res,{report},"Report fetched!");
    }catch(error){
        next(error);
    }
}