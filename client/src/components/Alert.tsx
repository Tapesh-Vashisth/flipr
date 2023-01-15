import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { appActions } from '../features/appSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

type propType = {
    message: string
}

export default function AlertDismissable(props: propType) {
    const app = useAppSelector((state) => state.app);
    const dispatch = useAppDispatch();
    
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error" onClose={() => dispatch(appActions.setShow(false))}>
                {props.message}
            </Alert>
        </Stack>
    );
}
