import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

interface Props {
    bottom: "right" | "left" | "center",
    vertical: "top" | "bottom",
    alert: any,
    setAlert: (arg0: any) => void,
    duration: number
}

export default function index(props: Props) {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: props.vertical || 'top',
                horizontal: props.bottom || 'right'
            }}
            open={props.alert.open}
            message={props.alert.message}
            ContentProps={{ style: { backgroundColor: props.alert.bgc } }}
            onClose={() => props.setAlert({ ...props.alert, open: false })}
            autoHideDuration={2000}
        />
    )
}
