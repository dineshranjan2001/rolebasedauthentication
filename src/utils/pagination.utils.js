const pagination=async(model,where={},options={})=>{
    const{page,size,order,attributes, include}=options;

    const offset=(page-1)*size;
    const limit=size;

    const {count,rows}=await model.findAndCountAll({
        where,
        include,
        order,
        attributes
    });

    const paginatedData=rows.slice(offset,offset+limit);
    const totalPages=Math.floor(count/size);

    return{
        result:paginatedData,
        pagination:{
            totalCount:parseInt(count),
            totalPages:parseInt(totalPages),
            currentPage:parseInt(page),
            perPage:parseInt(size),
        }
        
    }
}
module.exports=pagination;