import { useState } from "react";

export const useFormInput = (initialValue:any) => {
    initialValue="";
    const [ value, setValue ] = useState(initialValue);
    
    const handleChange = async (e:any) => {

        const tempValue = await e.currentTarget.value;
        setValue(tempValue);
    }

    return {

        value,
        reset: (newValue:any) => setValue(newValue),
        onIonChange: handleChange,
        onKeyUp: handleChange
    };
}

export const validateForm = (fields:any) => {

	let errors:any = [];

	fields.forEach((field:any) => {

		if (field.required) {

			const fieldValue = field.input.state.value;

			if (fieldValue === "") {

				const error = {

					id: field.id,
					message: `Please check your ${ field.id }`,
				};

				errors.push(error);
			}
		}
	});

	return errors;
}