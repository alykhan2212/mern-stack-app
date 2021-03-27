
function CreateCategories() {

    function onFormSubmit(e){
        e.preventDefault();
        console.log("hello");
    }
    return (
        <div className="container mt-5">
            <h3>Create Category</h3>
            <div className="row">
                <div className="col-lg-6">
                <form onSubmit={onFormSubmit}>
                        <div className="form-group">
                            <label>Category Name: </label>
                            <input type="text" className="form-control"/>
                        </div>
                        
                        <div className="form-group">
                            <input type="submit" value="Submit" className="btn btn-dark" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );

}

export default CreateCategories;