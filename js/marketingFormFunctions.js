        //#region Functions
        //Show/Hide fields if checkbox is/isn't ticked.
        function hideFieldDiv(inputToHide, checkboxId) {
            const divToHide = inputToHide.parentElement;
            divToHide.style.display = 'none';
            
            if(deciderInput) {
                checkboxId.addEventListener('change', function() {
                    if (this.checked) {
                        divToHide.style.display = '';
                    } else {
                        divToHide.style.display = 'none';
                    }
                });
            }
        }

        //Show/Hide field inputToHide if field deciderInput has value = valueToShowDiv 
        function hideFieldDiv(inputToHide, deciderInput, valueToShowDiv) {
            const divToHide = inputToHide.parentElement;
            divToHide.style.display = 'none';

            if (deciderInput) {
                deciderInput.addEventListener('change', function () {
                    if (deciderInput.value !== valueToShowDiv) {
                        divToHide.style.display = 'none';
                    } else {
                        divToHide.style.display = '';
                    }
                });
            }
        }

        
        function addSubmitButtonHoverEffect(effect, restingColor, hoverColor, restingDecoration, hoverDecoration) {
            let submitButton = document.getElementsByName("submitButton")[0];
            let alink = document.getElementsByName("alink")[0];

            console.log(alink)

            submitButton.style.transition = effect;

            submitButton.addEventListener('mouseover', function () {
                submitButton.style.backgroundColor = restingColor;
            });

            submitButton.addEventListener('mouseout', function () {
                submitButton.style.backgroundColor = hoverColor;
            });

            alink.addEventListener('mouseover', function () {
                alink.style.textDecoration = 'underline';
            });

            alink.addEventListener('mouseout', function () {
                alink.style.textDecoration = 'none';
            });
        }

        function initializeFormValidation() {
            const form = document.querySelector('.marketingForm');
            const allFormFields = form.querySelectorAll('form input, form select, form textarea, form checkbox');
            const formAllFieldArray = [];

            allFormFields.forEach((field) => {
                const span = document.createElement('span');
                span.style.color = "red";
                var errorSpan;

                if (field.type === "checkbox" || field.type === "tel") {
                    errorSpan = field.parentNode.insertAdjacentElement('afterend', span);
                    field.addEventListener('click', () => {
                        formField.validate();
                    });
                } else {
                    errorSpan = field.parentNode.insertBefore(span, field.nextSibling);
                    field.addEventListener('input', () => {
                        formField.validate();
                    });
                }

                const formField = new FormField(field, errorSpan);

                if (field.name === "firstname") formField.validationMessage = 'Please tell us how we can call you.';
                else if (field.name === "lastname") formField.validationMessage = 'We would really like to know your last name.';
                else if (field.name === "emailaddress1") formField.validationMessage = 'Do you really want us to send to this address?';
                else if (field.name === "mobilephone") formField.validationMessage = 'Seems like there is a typo in the phone number. It should start with "+", with at least 4 digits';
                else if (field.type === "checkbox") formField.validationMessage = 'Please allow us to send you emails.';
                else formField.validationMessage = 'Enter a valid value';

                formAllFieldArray.push(formField);
            });

            form.setAttribute('novalidate', true);
            form.addEventListener('d365mkt-formsubmit', (event) => {
                let isFormValid = true;
                formAllFieldArray.forEach((field) => {
                    if (!field.validate()) {
                        isFormValid = false;
                    }
                });
                if (!isFormValid) {
                    event.preventDefault();
                    console.log("Form submission is not valid");
                }
            });
        }

        //#endregion


        //#region Classes
        class FormField {
            constructor(element, errorSpan) {
                this.element = element;
                this.required = element.required;
                this.validationMessage = '';
                this.validField = true;
                this.errorSpan = errorSpan;
            }

            getValue() {
                return this.element.value;
            }

            setValue(value) {
                this.element.value = value;
            }

            clearValue() {
                this.element.value = '';
            }

            showError() {
                this.element.classList.add('errorField');
                this.errorSpan.textContent = this.validationMessage;
                this.errorSpan.style.display = 'block';
            }

            hideError() {
                this.element.classList.remove('errorField');
                this.errorSpan.textContent = '';
                this.errorSpan.style.display = 'none';
            }

            validate() {
                if (this.required && this.element.type === "checkbox") {
                    if (!this.element.checked) {
                        this.showError();
                        console.log(this.element.name + " checkbox not checked");
                        return false;
                    } else {
                        this.hideError();
                        return true;
                    }
                } else {
                    if ((this.required && !this.element.value) || !this.element.validity.valid) {
                        this.showError();
                        console.log(this.element.name + " value is not valid");
                        return false;
                    } else {
                        this.hideError();
                        return true;
                    }
                }
            }
        }

        //#endregion
