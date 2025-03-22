/**
 * Serviço de autenticação.
 * Este módulo fornece funções para interagir com a API de autenticação.
 */

import { post, get } from './baseAPI';

/**
 * Função para realizar o login do usuário.
 * @param {string} email - Email do usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<any>} - A resposta da API.
 */
export const login = (email: string, password: string): Promise<any> => {
    return post(
        '/api/login',
        {
            email,
            password
        },
        false // withToken = false, pois não precisamos de autenticação para login
    );
};

/**
 * Função para registrar um novo usuário.
 * @param {string} name - Nome do usuário.
 * @param {string} email - Email do usuário.
 * @param {string} password - Senha do usuário.
 * @param {string} password_confirmation - Confirmação da senha do usuário.
 * @returns {Promise<any>} - A resposta da API.
 */
export const register = (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
): Promise<any> => {
    return post(
        '/api/register',
        {
            name,
            email,
            password,
            password_confirmation
        },
        false // withToken = false, pois não precisamos de autenticação para registro
    );
};

/**
 * Função para obter os dados do usuário autenticado.
 * Utiliza o token de autenticação armazenado.
 * @returns {Promise<any>} - A resposta da API com os dados do usuário.
 */
export const getMe = (): Promise<any> => {
    return get(
        '/api/me',
        true // withToken = true, pois precisamos do token para autenticação
    );
};

/**
 * Função para realizar o logout do usuário.
 * Utiliza o token de autenticação armazenado para encerrar a sessão.
 * @returns {Promise<any>} - A resposta da API.
 */
export const logout = (): Promise<any> => {
    return post(
        '/api/logout',
        {}, // Corpo vazio
        true // withToken = true, pois precisamos do token para autenticação
    );
};

// Adicione outras funções como logout conforme necessário 