const DB = require("../../db/db-mongoose")
module.exports = {
    tell: async (ctx) =>{
        ctx.body={
            code:0,
            result:""
        }
    }

}