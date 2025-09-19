
function Product({data}){

    function handleClick(){
        
    }
    return(
        <div className="card mb-4">
            <div className="row">
                <div className="col-4">
                    <a href={"/product/" + data.id} target="_blank" >
                        <img src={data.thumbnail} class="img-fluid rounded-start amazon-pointer" alt="..."   /> 
                    </a>   
                    
                     
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <a href={"/product/" + data.id} target="_blank" >
                            <h5 className="card-title amazon-pointer"  >{data.title}</h5>
                        </a>
                        <h5 className="card-title"><i className="bi bi-currency-rupee"></i> {data.price}</h5>
                        <div><i className="bi bi-star-fill"></i> {data.rating}</div>
                        <div className="mt-3 mb-3">
                            <button className="btn btn-warning">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
