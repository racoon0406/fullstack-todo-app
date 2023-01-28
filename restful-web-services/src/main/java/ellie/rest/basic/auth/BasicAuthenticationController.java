package ellie.rest.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

//become Controller that can handle Rest request
@RestController
@CrossOrigin(origins="http://localhost:4200")
public class BasicAuthenticationController {

	//create a bean and return it back
	@GetMapping(path = "/basicauth")
	public AuthenticationBean helloWorldBean() {
		return new AuthenticationBean("You are authenticated.");
	}

}
