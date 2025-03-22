/**
 * Serviço de gerenciamento de Todos.
 * Este módulo fornece funções para interagir com a API de Todos.
 */

import { get, post } from './baseAPI';

/**
 * Função para obter a lista de todos os todos.
 * @returns {Promise<any>} - A lista de todos.
 */
export const fetchTodos = () => {
    return get('/todos');
};

/**
 * Função para adicionar um novo todo.
 * @param {object} todo - O objeto do todo a ser adicionado.
 * @returns {Promise<any>} - A resposta da API.
 */
export const addTodo = (todo: object) => {
    return post('/todos', todo);
};

// Adicione outras funções como updateTodo, deleteTodo conforme necessário 