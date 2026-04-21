import { UrlModel } from "./url.model.js";
export class UrlRepository{
async createShortUrl(longUrl, shortCode){
    const url= new UrlModel({longUrl, shortCode});
return await url.save()
}
async  findByShortCode(shortCode){
    return await UrlModel.findOne({shortCode})
}
async findByLongUrl(longUrl){
    return await UrlModel.findOne({longUrl})
}
async updateShortUrl(longUrl,shortCode){
return await UrlModel.findOneAndUpdate({shortCode},{longUrl},{returnDocument:"after"})
}
async deleteShortUrl(shortCode){
    return await UrlModel.findOneAndDelete(shortCode)
}
async accessCount(shortCode){
    return await UrlModel.findOneAndUpdate({shortCode},{$inc:{accessCount:1}},{returnDocument:"after"})
}
}