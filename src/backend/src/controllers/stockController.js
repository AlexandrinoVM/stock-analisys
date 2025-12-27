import StockService from "../models/sotckService.js";

class StockController {

 static async getStockData(req, res){
    try {
        const stockdata = await StockService.getStock();
        res.status(200).json(stockdata)
    }catch (error) {
        res.status(500).json({ error: error.message });
    }

}
}

export default StockController;