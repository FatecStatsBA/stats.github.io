


function checaSenha(usuarioCD,emailCD,senhaCD,senhaConfirme){ // chega se senhas são igual e enviar todos os dados já checados ao servidor
    if(senhaConfirme == senhaCD){ // SENHAS IGUAIS
        var socket = io( 'http://localhost:3000' );
            socket.emit('dadosCadastro', { // envia os dados a serem cadastrados
                usuario : usuarioCD,
                email  : emailCD,
                senha	 : senhaCD, 
            });
            alert('cadastrado com sucesso')
            document.getElementById('usuarioCD').value  = ''; // limpa as caixas de texto do cadastro
            document.getElementById('emailCD').value   = '';
            document.getElementById('senhaCD').value   = '';
            document.getElementById('senhaConfirme').value   = '';
        }else{
            alert('senhas não coencidem');
        };
}
    
function IsEmail(email){ // PARA CHEGAR SE O EMAIL É VALIDO
    let emailUso = email.substr(0, email.indexOf('@', 0));
    let dominio = email.substr(email.indexOf('@') + 1, email.legth);
    if ((emailUso.length >=1) &&
    (dominio.length >=3) && 
    (emailUso.search("@")==-1) && 
    (dominio.search("@")==-1) &&
    (emailUso.search(" ")==-1) && 
    (dominio.search(" ")==-1) &&
    (dominio.search(".")!=-1) &&      
    (dominio.indexOf(".") >=1)&& 
    (dominio.lastIndexOf(".") < dominio.length - 1)){
        return true;
    }else{
        return false;
    };
};
function cadastro(){ // JAVASCRIPT PARA CADASTRO    
    let contador = 0;
    let usuarioCD = document.getElementById('usuarioCD').value;
    let emailCD	  = document.getElementById('emailCD').value;
	let senhaCD	  = document.getElementById('senhaCD').value;
    let senhaConfirme = document.getElementById('senhaConfirme').value
     let emailTrue = IsEmail(emailCD);// chega se oque está escrito é um email

     
    if(emailTrue === true){//envia o email digitado ao servidor
        var socket = io( 'http://localhost:3000' );
        socket.emit('emailExistente', {
            emailTEST : emailCD,
        });
        
        socket.on('resEmailTest', (emailTEST) => {// resposta do email enviado vindo do servidor
            if(emailTEST.resp == false){
                alert('email cadastrado');
            }else{
                contador++
                    if(contador == emailTEST.tamanho){
                        checaSenha(usuarioCD,emailCD,senhaCD,senhaConfirme);
                    };
            };
        }); 
    }else{
        alert('email invalido');
    };
};

function loginF(){
    let contador = 0
    let emailLogin = document.getElementById('emailLogin').value;
    let senhaLogin = document.getElementById('senhaLogin').value;
    var socket = io( 'http://localhost:3000' );

    socket.emit('dadosLogin', {email: emailLogin,senha: senhaLogin})
    socket.on('retLogin',(dados) => {
        if(dados.retLogin == true){
            alert('login aprovado');
        }else{
            contador++

            if(contador == dados.tamanho){
                alert('vc não está cadastrado');
            };
        };  
    });
    
    
}