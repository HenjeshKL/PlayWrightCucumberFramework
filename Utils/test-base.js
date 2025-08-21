const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {


        testDataForOrder: {
            username: "sachinten@gmail.com",
            password: "Iamhero@0000",
            productName: "ZARA COAT 3"
        }


    }



)