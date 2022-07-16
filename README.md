Frontend do projeto Postbaker

## Components

### Button

| Props    | Description        | Tipo          |
| -------- | ------------------ | ------------- |
| Children | Elemento React     | React Element |
| loading  | Se está carregando | boolean       |

### Card

Card de Cliente
| Props | Description | Tipo
| -------------------------- | ------------------------------|-----------------
| name | nome do card| String
| id | id do card| number
| logo | Url da imagem do artigo| String

### DeleteItem

Modal de Deletar Item
| Props | Description | Tipo
| -------------------------- | ------------------------------|-----------------
| handleDeleteItem | função que será chamada para deletar o item| function
| handleNotDeleteItem | função que será chamada caso não deletar o item| function

### EditPost

Modal de Ediar Post
| Props | Description | Tipo
| -------------------------- | ------------------------------|-----------------
| saveClient | função que será chamada para salvar o item| function

### NewClient

Modal de criar novo Cliente
| Props | Description | Tipo
| -------------------------- | ------------------------------|-----------------
| saveClient | função que será chamada para salvar o item| function
| editClient | objeto edit e client| {edit:boolean, client:number}
| handleClose | função que será chamada quando fechar o modal| function

### NewPost

Modal para criar novo post
| Props | Description | Tipo
| -------------------------- | ------------------------------|-----------------
| saveClient | função que será chamada para salvar o item| function

### Authenticate

Modal para autenticar cliente para acessar os dados
| Props | Description | Tipo
| -------------------------- | ------------------------------|-----------------
| handleButton | função que será chamada para a pagina receber os dados da resposta caso a requisição for sucesso | function
| hash | hash do do cliente| string

### Carrousel

Carrousel de imagens que pode adicionar e remover imagens
| Props | Description | Tipo
| -------------------------- | ------------------------------|-----------------
| addItem | função que será chamada quando adicionar novas imagens | function
| deleteItem | função que chamarará quando arquivos forem deletados | function
| items | array de imagens| array[string || object file]

### Comment

Carrousel de imagens que pode adicionar e remover imagens
| Props | Description | Tipo
| -------------------------- | ------------------------------|-----------------
| comment | comentário | object

### NotPaymentAccept

Carrousel de imagens que pode adicionar e remover imagens
| Props | Description | Tipo
| -------------------------- | ------------------------------|-----------------
| handleButton | função quando clicar no botão | function

### RatingPost

Carrousel de imagens que pode adicionar e remover imagens
| Props | Description | Tipo
| -------------------------- | ------------------------------|-----------------
| closeModal | função quando clicar no botão de fechar | function
| values | dados do post | object
| user | se usuário esta logado | boolean
| clientToken | token do cliente | string
| updatePosts | função quando clicar no botão | function

### Row

Carrousel de imagens que pode adicionar e remover imagens
| Props | Description | Tipo
| -------------------------- | ------------------------------|-----------------
| buttons | função quando clicar no botão | boolean
| hdResponsive | função quando clicar no botão | boolean
| editItem | função quando clicar no botão editar | function
| deleteItem | função quando clicar no botão deletar | function
| ratingItem | função quando clicar no botão curtir | function
| openPost | função quando clicar card | function
