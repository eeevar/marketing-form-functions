# How to use this repository in your D365 CI forms
1. Copy the code below and paste it between the <body> and <main> tags in the HTML editor. In the funciton "afterFormLoad()" you can call the functions available in the repository. 

<script src="https://eeevar.github.io/marketing-form-functions/js-functions/marketingFormFunctions.js" onload="dispatchCustomEvent()"></script><script>
        function dispatchCustomEvent() {
            // Dispatch custom event after the JS file has loaded
            const event = new Event('CustomFunctionsLoaded');
            document.dispatchEvent(event);
            console.log("custom event dispatched");
        }

        document.addEventListener("d365mkt-afterformload", function () {
            afterFormLoad();
        });

        function afterFormLoad() {
                document.addEventListener('CustomFunctionsLoaded', function() {
                console.log("functions loaded");
                //CALL YOUR FUNCTIONS HERE.
            });
        }

</script>

2. You can also copy the function code straight from the repository and paste it into your form. In that case it should look something like this:

<script>
        document.addEventListener("d365mkt-afterformload", function () {
            afterFormLoad();
        });

        function afterFormLoad() {
                //toggleFieldByCheckbox("myinputname", "mycheckboxname");
            });
        }

//Show/Hide fields if checkbox is/isn't ticked.
        function toggleFieldByCheckbox(inputToHideName, checkboxName) {
            let inputToHide = document.getElementsByName(inputToHideName)[0];
            let decider = document.getElementsByName(checkboxName)[0];

            const divToHide = inputToHide.parentElement;
            divToHide.style.display = 'none';
            
            if(decider) {
                decider.addEventListener('change', function() {
                    if (this.checked) {
                        divToHide.style.display = '';
                    } else {
                        divToHide.style.display = 'none';
                    }
                });
            }
        }
</script>

# index.html
Use the index.html to test changes to your functions. Your changes will be live here: https://eeevar.github.io/marketing-form-functions/


# OOB eventlisteners
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
