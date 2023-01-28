package ellie.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

//temporarily act as database
@Service
public class TodoHardcodedService {
	private static List<Todo> todos = new ArrayList();
	private static long idCounter = 0;
	
	static {
		todos.add(new Todo(++idCounter, "super", "learn react", new Date(), false));
		todos.add(new Todo(++idCounter, "super", "learn JavaScript", new Date(), false));
		todos.add(new Todo(++idCounter, "super", "review", new Date(), false));
	}
	
	public List<Todo> findAll() {
		return todos;
	}
	
	public Todo save(Todo todo) {
		if(todo.getId() == -1 || todo.getId() == 0)//new insert
		{
			todo.setId(++idCounter);
			todos.add(todo);
		}
		else //update
		{
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
	
	public Todo deleteById(long id) {
		Todo todo = findByid(id);
		if(todo == null)
			return null;
		todos.remove(todo);
		return todo;
	}

	public Todo findByid(long id) {
		for(Todo todo:todos)
		{
			if(todo.getId() == id)
				return todo;			
		}
		return null;
	}
	
}
