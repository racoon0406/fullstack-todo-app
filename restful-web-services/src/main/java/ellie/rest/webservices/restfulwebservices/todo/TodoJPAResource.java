package ellie.rest.webservices.restfulwebservices.todo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import ellie.rest.webservices.restfulwebservices.todo.Todo;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TodoJPAResource {
	
	@Autowired
	private TodoHardcodedService todoService;
	
	@Autowired
	private TodoJPARepository todoJPARepository;
	
	@GetMapping(path="/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username) {
		return todoJPARepository.findByUsername(username);
		//return todoService.findAll();
	}
	
	@GetMapping(path="/jpa/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id) {
		return todoJPARepository.findById(id).get();
		//return todoService.findByid(id);
	}
	
	@DeleteMapping(path="/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
//		Todo todo = todoService.deleteById(id);
//		if(todo != null)
//			return ResponseEntity.noContent().build();//delete successfully, return no content
//		return ResponseEntity.notFound().build();//delete failed, return not found
		todoJPARepository.deleteById(id);//void method
		return ResponseEntity.noContent().build();//if successful, return no content
	}
	
	//update method
	@PutMapping(path="/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo) {
		//Todo todoUpdated = todoService.save(todo);
		todo.setUsername(username);//save username because front-end won't type in assuming inputs all belong to the login user
		Todo todoUpdated = todoJPARepository.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);//return status ok with the content of updated resource
	}
	
	//post method
	@PostMapping(path="/jpa/users/{username}/todos")
	public ResponseEntity<Void> addTodo(@PathVariable String username, @RequestBody Todo todo) {
		//Todo todoCreated = todoService.save(todo);
		todo.setUsername(username);
		Todo todoCreated = todoJPARepository.save(todo);
		//get current resource url
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()//take current request path
				.path("/{id}")//append /id to the path
				.buildAndExpand(todoCreated.getId()).toUri();//using todoCreated id
		return ResponseEntity.created(uri).build();//return the uri of created resource
	}
}
