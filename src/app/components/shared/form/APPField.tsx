import { AnyFieldApi } from "@tanstack/react-form";
import React from "react";
import { Label } from "../../ui/label";
import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";


const getErrorMessage = (error : unknown) :string => {

   if(typeof error === "string"){
    return error
   }
   if(error  && typeof error === 'object'){
    if("message" in error && typeof error.message === "string"){
        return error.message
    }


   }
    return String(error)
}
type APPfieldProps = {
    field :AnyFieldApi
    label:string
    type?: "text" | "number" | "email" | "password" | "tel" | "url" | "search" | "date" | "time" | "datetime-local"
    placeholder?:string
    append?: React.ReactNode
    prepend?: React.ReactNode
    className?:string
    disabled?:boolean
   
}
const Appfield =({
    field,    label,
    type = "text",
    placeholder,
    append,
    prepend,
    className,
    disabled = false,
}:APPfieldProps)=>{
    let firstError = null;
    if (field.state.meta.isTouched && field.state.meta.errors.length > 0) {
        const err = field.state.meta.errors[0];
        if (typeof err === 'string') {
            firstError = err;
        } else if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
            firstError = err.message;
        } else {
            firstError = null; // Don't show [object Promise] or other non-string errors
        }
    }

    const hasError = firstError !== null
    
    
    return (
        <div className={cn("space-y-1",className)}>
          <Label htmlFor={field.name}
          className={cn(hasError && "text-destructive")}>{label}</Label>
            <div className="relative">
                {
                    prepend && (
                        <div className="absolute inset-y-0 left-0 items-center pl-3 pointer-events-none" >
                            {prepend}
                        </div>
                    )
                }
                <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-invalid={hasError ? "true" : "false"}
                    aria-disabled={disabled ? "true" : "false"}
                    className={cn(
                        prepend && "pl-10",
                        append && "pr-10",
                        hasError && "border-destructive focus:ring-destructive"
                    )}
                />
                {
                    append && (
                        <div className="absolute inset-y-0 right-0 items-center pr-3">
                            {append}
                        </div>
                    )
                }
                {
                    hasError && (
                        <p id={`${field.name}-error`}
                        role="alert" 
                        className="mt-1 text-sm text-destructive">
                            {firstError}
                        </p>
                    )
                }
                        
            </div>
        </div>
    )
}

export default Appfield;