<div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
    <form action="" method="POST">
        @csrf
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addModalLabel">New product</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="errMsgContainer">

                    </div>

                    <div class="form-group">
                        <label for="title">Product title</label>
                        <input type="text" class="form-control" name="title" placeholder="Product title" id="title">
                    </div>

                    <div class="form-group mt-2">
                        <label for="prace">Product price</label>
                        <input type="text" class="form-control" name="prace" placeholder="Product price" id="prace">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary add_product">Save product</button>
                </div>
            </div>
        </div>
    </form>
</div>
