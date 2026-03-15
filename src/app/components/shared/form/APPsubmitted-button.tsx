import React from 'react';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';
import { Loader, Loader2 } from 'lucide-react';

type APPsubmittedButtonProps = {
    isPending?: boolean
    children?: React.ReactNode
    pendingLabel?: string
    className?: string
    disable?: boolean
}
const APPsubmittedButton = ({ 
    isPending,
     children,
     pendingLabel = "Submitting...", 
     className, 
     disable = false }: APPsubmittedButtonProps) => {
            const isdisabled = disable || isPending;
    return (
    
        
            <Button type='submit' disabled={isdisabled} className={cn("w-full", className)}>
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" aria-hidden="true" />
                        {pendingLabel}
                    </>
                ) : (
                    children
                )}
            </Button>
        
    );  
}
export default APPsubmittedButton;