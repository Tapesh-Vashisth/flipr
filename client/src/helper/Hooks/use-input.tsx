import React, { useReducer } from "react";

interface initialInputStateType {
    value: string
    isTouched: boolean
}

interface actionType {
    type: string
    value: string
}

const initialInputState = {
    value:"",
    isTouched:false
}

const inputStateReducer=(state: initialInputStateType, action: actionType)=>{
    if(action.type==="INPUT"){

        return{value:action.value, isTouched: state.isTouched};
        
    }
    if(action.type==="BLUR"){
        return{isTouched:true, value: state.value}
    }
    if(action.type==="RESET"){
        return{
            isTouched:false,
            value:''
        }
    }
    return initialInputState;
};

const useInput=(validateValue: any)=>{

    const [inputState, dispatchInput] = useReducer(inputStateReducer, initialInputState);

    const valueIsValid = validateValue(inputState.value);
	const haserror = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatchInput({type:'INPUT', value: event.target.value});
	};

    const inputBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatchInput({type:'BLUR', value: ""});
	};

    const reset=()=>{
        dispatchInput({type: "RESET", value: ""});
    }

    return{
        value: inputState.value,
        isValid:valueIsValid,
        haserror,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };

};

export default useInput;