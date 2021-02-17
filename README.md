# Recuperação de Senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos não Funcionais**

- Utilizar Mailtrap para testar envios em ambientes de dev;
- Utilizar o Amazon SES para envios em produção;
- O envio de email deve acontecer em segundo plano(background job);

**Regra de Negocios**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização do Perfil

**Requisitos Funcionais**

- O usuario deve poder atualizar seu nome, email e senha;

**Requisitos Não Funcionais**

**Regras de Negocios**

- O usuário não pode alterar seu email, para um email já utilizado;
- O usuário ao alterar senha, deverá informar a senha antiga;
- Para atualizar a senha, o usuário precisa confirmar a senha alterada;

# Painel do Prestador

**Requisitos Funcionais**

- O prestador deve poder listar seus agendamentos de um dia especifico;
- O prestador  deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

--- MINHAS OPNIÃO ---
- Prestador deve poder alterar sua agenda;


**Requisitos Não Funcionais**

- Os agendamentos do dia deve ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando o Socket.io;


**Regras de Negócio**

- Notificação deve ter um status de lida ou não lida;

--- MINHAS OPNIÃO ---
- Prestador não pode retirar seus horarios com menos de 1h antecedencia;
- Prestador deve liberar pelo menos um dia disponivel na semana;
- Prestador não pode liberar datas que já passaram;


# Agendamento de serviços

**Requisitos Funcionais**

- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponivel de um prestador;
- O usuário deve poder listar horários disponivéis em um dia específico de um prestador;
- O usuário deve poder realizar em novo agendamento com um prestador;

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;


**Regras de Negócio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos deve estar disponiveis entre 8h ás 18h ( Primeiro as 08h e último as 17h);
- O usuário não pode agendar um horário ocupado;
- O usuário não pode agendar um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
