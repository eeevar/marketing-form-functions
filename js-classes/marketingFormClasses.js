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