/**
 * Configuração da base da API.
 * Este módulo fornece funções para realizar requisições HTTP.
 */

import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL; // URL da sua API
let token = localStorage.getItem('token') || '';


const api = axios.create({
    baseURL,
});

// Interceptor para adicionar o token nas requisições
api.interceptors.request.use((config) => {
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

/**
 * Função para atualizar o token de autenticação.
 * @param {string} newToken - O novo token a ser armazenado.
 */
export const updateToken = (newToken: string) => {
    token = newToken; // Atualiza a variável do token
    localStorage.setItem('token', newToken); // Armazena o token no localStorage
};


/**
 * Função para realizar requisições GET.
 * @param {string} endpoint - O endpoint da API.
 * @param {boolean} withToken - Se true, adiciona o token de autenticação.
 * @returns {Promise<any>} - A resposta da API.
 */
export const get = (endpoint: string, withToken: boolean = false): Promise<any> => {
    if (withToken) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    return api.get(endpoint);
};

/**
 * Função para realizar requisições POST.
 * @param {string} endpoint - O endpoint da API.
 * @param {object} data - Os dados a serem enviados.
 * @param {boolean} withToken - Se true, adiciona o token de autenticação.
 * @returns {Promise<any>} - A resposta da API.
 */
export const post = (endpoint: string, data: object, withToken: boolean = false): Promise<any> => {
    if (withToken) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    return api.post(endpoint, data);
};

/**
 * Função para realizar requisições PUT.
 * @param {string} endpoint - O endpoint da API.
 * @param {object} data - Os dados a serem enviados.
 * @param {boolean} withToken - Se true, adiciona o token de autenticação.
 * @returns {Promise<any>} - A resposta da API.
 */
export const put = (endpoint: string, data: object, withToken: boolean = false): Promise<any> => {
    if (withToken) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    return api.put(endpoint, data);
};

/**
 * Função para realizar requisições DELETE.
 * @param {string} endpoint - O endpoint da API.
 * @param {boolean} withToken - Se true, adiciona o token de autenticação.
 * @returns {Promise<any>} - A resposta da API.
 */
export const del = (endpoint: string, withToken: boolean = false): Promise<any> => {
    if (withToken) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    return api.delete(endpoint);
};

// Adicione outras funções conforme necessário

export default api; 