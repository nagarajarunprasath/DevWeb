load.initialize(async function () {
});

load.action("Action", async function () {
    let EmplistTransaction = new load.Transaction("TC01_GET Employee List"); // Define your transaction by creating a transaction object and parameter
    EmplistTransaction.start(); // Start tranasaction 
    const webResponse1 = new load.WebRequest({
        id: 1,
        url: "http://dummy.restapiexample.com/api/v1/employees",
        method: "GET",
        extractors:[
            new load.JsonPathExtractor("Captured Value: ", '$.status')
        ],
    }).sendSync();
if(EmplistTransaction.update().duration < 1000 && webResponse1.status == 200) // Defining and verfiying Response Time SLA Check.
{
    EmplistTransaction.stop(load.TransactionStatus.Passed); // Stop Transaction with PASS Status
}else{
    EmplistTransaction.stop(load.TransactionStatus.Failed); // Stop Trasaction with FAIL Status
}
});

load.finalize(async function () {
});
