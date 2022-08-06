import { defineComponent,ref } from "vue";
import { useStorage } from  "../utils/useStorage"

export default defineComponent({
    setup(props) {
        let title = ref('')
        let todos = useStorage('todos')
        function addTodo(){
            todos.value.push({
                title:title.value,
                done:false
            })
            title.value = ''
        }
        return () => <div>
            <input type="text" VModel={title.value} />
            <button onClick={addTodo}>click</button>
            <ul>
                {
                    todos.value.length ? todos.value.map(todo => {
                        return <li>{todo.title}</li>
                    }) : <li>no data</li>
                }
            </ul>
        </div>
    }
})