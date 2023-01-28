package ellie.rest.webservices.restfulwebservices.jwt.resource;

import java.io.Serializable;

public class  JwtTokenRequest implements Serializable {
  
  private static final long serialVersionUID = -5616176897013108345L;

  private String username;
    private String password;

    
//     {
//		"token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlciIsImV4cCI6MTY1OTUzOTYyMywiaWF0IjoxNjU4OTM0ODIzfQ.l_8faQGQa4DYC7jJA8fQ3kgncbxtvCerUZGlO55QY8vI86c5CaahnOjZLnoHDjLTQ6TW3V2sDoP4NbLPsngnmA"
//	}
     
    
    public JwtTokenRequest() {
        super();
    }

    public JwtTokenRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

