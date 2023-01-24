class Validator {
    constructor(config){
        this.elementConfig = config;
        this.errors = {}

        this.generateErrorsObject()
        this.inputListener()
    }
    generateErrorsObject(){
        for(let filed in  this.elementConfig){
            this.errors[filed] = [];

        }
    }

    inputListener(){
        let inputSelector = this.elementConfig;

        for(let filed in inputSelector){
            let el = document.querySelector(`input[name="${filed}"]`)

            el.addEventListener('input', this.validation.bind(this));
        }
    }

    validation(e){
        let elFiled = this.elementConfig;
        let filed = e.target;
        let filedName = filed.getAttribute('name');
        let filedValue = filed.value;

        this.errors[filedName] = []

        if(elFiled[filedName].required){
            if(filedValue === ''){
                this.errors[filedName].push('polje ne smije biti prazno')
            }
        }

        if(elFiled[filedName].email){
            if(!this.validationEmail(filedValue))
            this.errors[filedName].push('neispravna email adresa')
        }

        if(filedValue.length < elFiled[filedName].minlength || filedValue.length > elFiled[filedName].maxlength){
            this.errors[filedName].push(`Polje mora imati najmanje ${elFiled[filedName].minlength} i najvise ${elFiled[filedName].maxlength} karaktera`)
        }
        if(elFiled[filedName].matching){
            let matchingEl = document.querySelector(`input[name="${elFiled}"]`)

            if(filedValue !== matchingEl.value){
                this.errors[filedName].push('lozinke se ne poklapaju');
            }
            if(this.errors[filedName] === 0){
                this.errors[filedName] = []
                this.errors[elFiled[filedName].matching] = []
            }
         
         } 

        this.populateErrors(this.errors)

    }

    populateErrors(errors){
        for(const elem of document.querySelectorAll('ul')){
            elem.remove()
        }
        for(let key of Object.keys(errors)){
            let parentElement = document.querySelector(`input[name="${key}"]`).parentElement
            
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement)

            errors[key].forEach(error => {
                let li = document.createElement('li')
                li.innerText = error;

                errorsElement.appendChild(li)
                
            });
        }
    }
    
    validationEmail(){
        if(  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
            return true
        }
        return false    
     }
}