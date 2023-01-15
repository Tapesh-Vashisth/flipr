import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

type propType = {
    message: string
    showState: boolean
}

function AlertDismissable(props: propType) {
  const [show, setShow] = useState(true)

  const [state, setState] = useState(props.showState)

  useEffect(() => {
    console.log(state)
    
  }, [state])

        if (show) {
            return (
                <Alert variant="danger" onClose={() => setShow(false)} style={{ height: "50px", marginBottom: "0px" }} dismissible>
                <p>
                    {props.message}
                </p>
                </Alert>
            )
        }
        return <></>
}

export default AlertDismissable