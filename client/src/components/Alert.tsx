import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { appActions } from '../features/appSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';


export default function AlertDismissable() {
    const app = useAppSelector((state) => state.app);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        const hold = setTimeout(() => {
            dispatch(appActions.setShow(false));
        }, 3000);

        return () => {
            clearTimeout(hold);
        }
    }, [])

    return (
        app.show ? 
        <Stack sx={{ width: '100%' }} spacing={1} padding = {0}>
            <Alert severity={app.type} sx = {{padding: "0px 8px"}} onClose={() => dispatch(appActions.setShow(false))}>
                {app.message}
            </Alert>
        </Stack>
        : null
    );
}
