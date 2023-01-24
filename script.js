let config = {
    'ime_prezime': {
        required: true,
        minlength: 5,
        maxlength: 50,

    },

    'korisnicko_ime': {
        required: true,
        minlength: 3,
        maxlength: 50
    },

    'email':{
        required: true,
        minlength: 7,
        maxlength: 30
    },
    'postal':{
        required: false,
        minlength: 3,
        maxlength: 20,
    },
    'phone': {
        required: false,
        minlength: 7,
        maxlength: 13,
    },
    'lozinka':{
        required: true,
        minlength: 8,
        maxlength: 20,
        matching: 'potvrdi_lozinku'
    },
    'potvrdi_lozinku':{
        required: true,
        minlength: 8,
        maxlength: 20,
        matching: 'lozinka'
    }

}

let validator = new Validator(config)
