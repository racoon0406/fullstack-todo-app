package ellie.rest.basic.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfigurationBasicAuth extends WebSecurityConfigurerAdapter{
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf().disable()//to prevent cross-site request forgery		
		.authorizeRequests()
		//allow any pre-flight requests(an options request) without authentication to all URLs
		.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
		//allow all the other request to use basic authentication
						.anyRequest().authenticated()
						.and()
		//http.formLogin(); //not allow 
						.httpBasic();
	}
}
