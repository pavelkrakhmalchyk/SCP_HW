const car_table = "HiMTA::ExtraInfo.Car";
const car_seq_name = "HiMTA::crid";
const carshop_table = "HiMTA::CarShop";
const carshop_seq_name = "HiMTA::shopid";
const address_table = "HiMTA::ExtraInfo.Address"
const address_seq_name = "HiMTA::adrid";

var constants = class Constants {

    static get CAR_TABLE(){
        return car_table;
    }

    static get CAR_SEQ_NAME(){
        return car_seq_name;
    }

    static get CARSHOP_TABLE(){
        return carshop_table;
    }

    static get CARSHOP_SEQ_NAME(){
        return carshop_seq_name;
    }

    static get ADDRESS_TABLE(){
        return address_table;
    }

    static get ADDRESS_SEQ_NAME(){
        return address_seq_name;
    }
};