// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCF2D-H7JypjNG7v10EtYgNNitqcGo9zUo",
    authDomain: "datos-formulario-81115.firebaseapp.com",
    projectId: "datos-formulario-81115",
    storageBucket: "datos-formulario-81115.appspot.com",
    messagingSenderId: "462927672797",
    appId: "1:462927672797:web:d1333fdd426e516476b234",
    measurementId: "G-JR68PDVDEJ"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.querySelector('#formulario').addEventListener('submit', (event) => {
    event.preventDefault()
    const nombre = document.querySelector('#name')
    const email = document.querySelector('#email')
    const clave = document.querySelector('#password')

    const resultado = validarCampos(nombre, email, clave)

    if (resultado) {
        
        console.log(nombre.value)
        console.log(email.value)
        console.log(clave.value)
        db.collection("users").add({
            nombre: nombre.value,
            email: email.value,
            clave: clave.value
        })
        .then((docRef) => {
            alert('Formulario enviado con éxito', docRef.id)
            document.querySelector('#formulario').reset()
        })
        .catch((error) => {
            alert("Error envíando el formulario: ", error);
        });      
    }
})

function validarCampos(nombre, email, clave) {
    let msjNombre = ''
    let msjEmail = ''
    let msjClave = ''

    msjNombre = validarNombre(nombre.value.trim())
    msjEmail = validarCorreo(email.value.trim())
    msjClave = validarClave(clave.value.trim())

    if (msjNombre == '' && msjEmail == '' && msjClave == '') {
        return true
    } else {
        mostrarError(msjNombre, msjEmail, msjClave)
        return false
    }
}

function validarNombre(nombre) {
    let msjNombre = ''
    if (nombre == '') {
        msjNombre = 'El nombre no puede estar vacío'
    }
    return msjNombre
}

function validarCorreo(email) {
    let msjEmail = ''
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email == '') {
        msjEmail = 'El email no puede estar vacío'
    } else if (!emailPattern.test(email)) {
        msjEmail = 'No es un email válido'
    }
    return msjEmail
}

function validarClave(clave) {
    let msjClave = ''
    let clavePattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/

    if (clave == '') {
        msjClave = 'La constraseña no puede estar vacía'
    } else if (!clavePattern.test(clave)) {
        msjClave = 'La contraseña debe tener al menos 4 caracteres, 1 mayúscula, 1 número y un caracter especial'
    }
    return msjClave
}


function mostrarError(msjNombre, msjEmail, msjClave) {
    const nombre = document.querySelector('#nameError')
    const email = document.querySelector('#emailError')
    const clave = document.querySelector('#passwordError')

    nombre.innerHTML = msjNombre
    email.innerHTML = msjEmail
    clave.innerHTML = msjClave
}