import { useState, useEffect } from 'react'
import { Card, Input, Button } from '@/components/ui'
import { Plus, Trash2, Check, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { subscribeToTodos, addTodo, toggleTodo, deleteTodo } from '@/services/todos'

const TodoList = () => {
    const { user } = useAuth()
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        if (user?.uid) {
            const unsubscribe = subscribeToTodos(user.uid, (data) => {
                setTodos(data)
                setLoading(false)
            })
            return () => unsubscribe()
        }
    }, [user])

    const handleAdd = async (e) => {
        e.preventDefault()
        const text = newTodo.trim()
        if (!text || !user) return

        setAdding(true)
        try {
            await addTodo(user.uid, text)
            setNewTodo('')
        } catch (error) {
            console.error(error)
        } finally {
            setAdding(false)
        }
    }

    const handleToggle = async (todo) => {
        if (!user) return
        try {
            await toggleTodo(user.uid, todo.id, todo.completed)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (todoId) => {
        if (!user || !window.confirm('Supprimer cette tâche ?')) return

        setDeletingId(todoId)
        try {
            await deleteTodo(user.uid, todoId)
        } catch (error) {
            console.error(error)
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <Card className="h-full flex flex-col">
            <h3 className="font-bold text-text-primary text-lg mb-4">Ma To-Do List</h3>

            <form onSubmit={handleAdd} className="flex gap-2 mb-4">
                <Input
                    placeholder="Ajouter une tâche..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="py-2"
                />
                <Button size="sm" type="submit" className="px-3" disabled={adding || !newTodo.trim()}>
                    {adding ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                </Button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar max-h-[250px]">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="animate-spin text-cyan" size={24} />
                    </div>
                ) : (
                    <>
                        {todos.map(todo => (
                            <div
                                key={todo.id}
                                className={`
                      group flex items-center gap-3 p-3 rounded-lg border transition-all duration-300
                      ${todo.completed
                                        ? 'bg-green-500/5 border-green-500/10'
                                        : 'bg-bg-card-hover border-border-primary'
                                    }
                    `}
                            >
                                <button
                                    onClick={() => handleToggle(todo)}
                                    className={`
                        w-5 h-5 rounded-md border flex items-center justify-center transition-colors
                        ${todo.completed
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'border-border-primary hover:border-cyan text-transparent'
                                        }
                      `}
                                >
                                    <Check size={14} strokeWidth={3} />
                                </button>
                                <span
                                    className={`flex-1 text-sm ${todo.completed ? 'text-text-secondary line-through' : 'text-text-primary'}`}
                                >
                                    {todo.text}
                                </span>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    disabled={deletingId === todo.id}
                                    className="text-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                                >
                                    {deletingId === todo.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                </button>
                            </div>
                        ))}
                        {todos.length === 0 && (
                            <p className="text-center text-text-secondary text-sm py-8 italic">
                                Aucune tâche pour le moment.
                                <br />Profitez-en pour avancer sur vos modules !
                            </p>
                        )}
                    </>
                )}
            </div>
        </Card>
    )
}

export default TodoList
