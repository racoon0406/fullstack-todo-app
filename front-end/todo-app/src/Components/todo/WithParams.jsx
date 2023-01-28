import {useParams} from 'react-router-dom'

//functional component
function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

export default withParams