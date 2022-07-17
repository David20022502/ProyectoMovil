import { useFormInput } from "./Utils";

export const useSignupFields = () => {

    return [
        {
            id: "name",
            label: "Nombres",
            required: true,
            input: {
                
                props: {
                    
                    type: "text",
                    placeholder: "Joe Bloggs"
                },
                state: useFormInput("")
            }
        },
        {
            id: "lastname",
            label: "Apellidos",
            required: true,
            input: {
                
                props: {
                    
                    type: "text",
                    placeholder: "Fuentes lagos"
                },
                state: useFormInput("")
            }
        },
        {
            id: "email",
            label: "Email",
            required: true,
            input: {
                
                props: {
                    
                    type: "email",
                    placeholder: "joe@bloggs.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Contraseña",
            required: true,
            input: {
                
                props: {
                    
                    type: "password",
                    placeholder: "*********"
                },
                state: useFormInput("")
            }
        },

    ];
}

export const useLoginFields = () => {

    return [

        {
            id: "email",
            label: "Email",
            required: true,
            input: {
                
                props: {
                    type: "email",
                    placeholder: "joe@bloggs.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            required: true,
            input: {
                
                props: {
                    type: "password",
                    placeholder: "*******"
                },
                state: useFormInput("")
            }
        }
    ];
}