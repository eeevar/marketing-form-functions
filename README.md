# marketing-form-functions



These eventlisteners are OOB from Microsoft with CIJ. Use them to trigger your functions as necessary.
document.addEventListener("d365mkt-beforeformload", function () {
    console.log("d365mkt-beforeformload");
});

document.addEventListener("d365mkt-afterformload",  function () {
    console.log("d365mkt-afterformload");
});

document.addEventListener("d365mkt-formrender", function () {
    console.log("d365mkt-formrender");
});

document.addEventListener("d365mkt-formsubmit", function () {
    console.log("blocked mkt-formsubmit");
});
