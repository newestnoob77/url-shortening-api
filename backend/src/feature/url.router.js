import express from 'express';
import { UrlController } from './url.controller.js';
export const urlRouter = express.Router();
const urlController = new UrlController();
urlRouter.post("/shorten",(req,res,next)=>{
    urlController.createShortUrl(req,res,next)
})
urlRouter.get("/:code",(req,res,next)=>{
    urlController.retreiveOrginalUrl(req,res,next)
})
urlRouter.put("/:shortCode",(req,res,next)=>{
    urlController.updateShortUrl(req,res,next)
})
urlRouter.delete("/:shortCode",(req,res,next)=>{
    urlController.deleteShortUrl(req,res,next)
})
urlRouter.get("/shorten/:shortCode/stats",(req,res,next)=>{
    urlController.stats(req,res,next)
})