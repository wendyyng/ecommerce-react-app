import {FormInputLabel, Input, Group} from './form-input.styles'

const FormInput = ({ label, ...otherProps}) => {
    return(
        <Group>
            <Input {...otherProps} />
            {label && (
                  <FormInputLabel 
                  //if length is 0 it will falsy, otherwise true
                  shrink={otherProps.value.length}
                //   className={`${
                //     otherProps.value.length ?  'shrink' : ''} 
                //     form-input-label`}
                    >
                        {label}
                        </FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput