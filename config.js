module.exports = {

    // Token do bot
    token: "",

    // Rich Presence : Jogando algo...
    game: "banindo selfbots",

    /**
     * As mensagens que o bot enviará
     * {user} será substituído automaticamente pelo usuário #
     * {guild} será automaticamente substituído pelo nome do servidor
     */
    sentences: {
        logs: "{user} acaba de ser banido de {guild}. motivo: selfbot!",
        banned: "Você acaba de ser banido de {guild}. motivo: você foi detectado como um seflbot!",
        whitelist: "Desculpe, este servidor não está incluído na lista de permissões!"
    },

    // A lista de permissões permite que você limite o bot a certos servidores
    whitelist: {
        enabled: false, // Se a lista de permissões está habilitada
        guilds: [] // Servidores que estão na lista de permissões
    },

    // O ID do canal para onde as mensagens de log serão enviadas (para administradores)
    logs: ""
    
}
