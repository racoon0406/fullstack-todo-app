import {useNavigate} from 'react-router-dom'

//functional component
function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation