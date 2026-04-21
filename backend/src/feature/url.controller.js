import { UrlModel } from "./url.model.js";
import { UrlRepository } from "./url.repository.js";
import { ApplicationError } from "../middleware/application.Error.js";
import shortid from "shortid";
export class UrlController{
constructor(){
    this.urlRepository = new  UrlRepository()
}
 async createShortUrl(req,res){
    try{
const {longUrl} = req.body;
let existing = await this.urlRepository.findByLongUrl(longUrl)
if(existing){
    return res.json({shortUrl:`http://localhost:3000/api/url/${existing.shortCode}`})
}
const shortCode = shortid.generate();
console.log(shortCode);
const newUrl = await this.urlRepository.createShortUrl(longUrl,shortCode)
return res.status(201).json({shortUrl:`http://localhost:3000/api/url/${newUrl.shortCode}`});
    }
    catch(err){
        console.log(err);
        throw  new ApplicationError("Something went wrong",500)
    }
}
async retreiveOrginalUrl(req,res){
    try{
const {code}=req.params;
const url =await this.urlRepository.accessCount(code)
if(!url) return res.status(404).json({error:"Short URL not found"})
const {accessCount,...filteredUrlDetails}=url.toObject()
return res.status(200).send(filteredUrlDetails)
    }
    catch(err){
        console.log(err)
        throw new ApplicationError("Something went wrong",500)
    }
}
async updateShortUrl(req,res,){
    try{
const {shortCode}=req.params;
const {longUrl}=req.body;
console.log(shortCode,longUrl)
const updateUrl = await this.urlRepository.updateShortUrl(longUrl,shortCode)
console.log(updateUrl)
if(!updateUrl) return res.status(400).send("Update failed")
return res.status(200).send(updateUrl)
    }
    catch(err){
        console.log(err)
        throw new ApplicationError("Something went wrong",500)
    }
}
async deleteShortUrl(req,res){
    try{
const {shortCode}=req.params
console.log(shortCode)
const deleted = await this.urlRepository.deleteShortUrl(shortCode)
console.log(deleted)
if(!deleted) return res.status(403).send("Deletion failed")
return res.status(200).send("Deleted successfully")
}
    catch(err){
        console.log(err)
        throw new ApplicationError("Something went wrong")
    }

}
async stats(req,res){
    try{
const {shortCode}=req.params
const stat=await this.urlRepository.findByShortCode(shortCode)
if(!stat) return res.status(404).send("Short URL not found")
return res.status(200).send(stat)
    }
    catch(err){
        console.log(err)
        throw new ApplicationError("Something went wrong",500)
    }
}


}